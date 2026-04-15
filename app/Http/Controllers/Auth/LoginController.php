<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class LoginController extends Controller
{
    /**
     * Display the login page.
     */
    public function showLoginForm()
    {
        return Inertia::render('Auth/Login');
    }

    /**
     * Handle an authentication attempt.
     */
    public function login(Request $request)
    {
        $request->validate([
            'identifier' => ['required', 'string'],
            'password' => ['required', 'string'],
        ], [
            'identifier.required' => 'NIM/NIP wajib diisi.',
            'password.required' => 'Password wajib diisi.',
        ]);

        // Rate limiting
        $this->ensureIsNotRateLimited($request);

        $credentials = [
            'identifier' => $request->identifier,
            'password' => $request->password,
        ];

        if (! Auth::attempt($credentials, $request->boolean('remember'))) {
            throw ValidationException::withMessages([
                'identifier' => 'NIM/NIP atau password salah.',
            ]);
        }

        $user = Auth::user();

        // Check if user is active
        if (! $user->is_active) {
            Auth::logout();
            throw ValidationException::withMessages([
                'identifier' => 'Akun Anda telah dinonaktifkan. Hubungi administrator.',
            ]);
        }

        $request->session()->regenerate();

        // Update last login
        $user->update(['last_login_at' => now()]);

        // Audit log
        AuditLog::create([
            'user_id' => $user->id,
            'action' => 'login',
            'ip_address' => $request->ip(),
            'user_agent' => $request->userAgent(),
            'description' => 'User logged in',
            'created_at' => now(),
        ]);

        // Redirect based on role
        return redirect()->intended(route($user->role->dashboardRoute()));
    }

    /**
     * Log the user out.
     */
    public function logout(Request $request)
    {
        $user = $request->user();

        if ($user) {
            AuditLog::create([
                'user_id' => $user->id,
                'action' => 'logout',
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'description' => 'User logged out',
                'created_at' => now(),
            ]);
        }

        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('login');
    }

    /**
     * Ensure the login request is not rate limited.
     */
    protected function ensureIsNotRateLimited(Request $request): void
    {
        $key = 'login:' . $request->ip();
        $maxAttempts = 5;

        if (app('cache')->get($key, 0) >= $maxAttempts) {
            throw ValidationException::withMessages([
                'identifier' => 'Terlalu banyak percobaan login. Silakan coba lagi dalam beberapa menit.',
            ]);
        }

        app('cache')->put($key, app('cache')->get($key, 0) + 1, 300);
    }
}
