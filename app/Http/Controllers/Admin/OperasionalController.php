<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AuditLog;
use App\Models\Billing;
use App\Models\HelpdeskTicket;
use App\Models\Announcement;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class OperasionalController extends Controller
{
    // ===== User & Keamanan =====
    public function users(Request $request)
    {
        $users = User::when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('identifier', 'like', "%{$s}%"))
            ->when($request->role, fn ($q, $r) => $q->where('role', $r))
            ->orderBy('name')
            ->paginate(20)->withQueryString();

        return Inertia::render('Admin/Keamanan/Users', [
            'users' => $users,
            'filters' => $request->only(['search', 'role']),
        ]);
    }

    public function resetPassword(Request $request, User $user)
    {
        $user->update(['password' => Hash::make('password')]);
        AuditLog::create([
            'user_id' => $request->user()->id,
            'action' => 'reset_password',
            'model_type' => 'User',
            'model_id' => $user->id,
            'description' => 'Reset password for ' . $user->name,
            'ip_address' => $request->ip(),
            'created_at' => now(),
        ]);
        return redirect()->back()->with('success', 'Password ' . $user->name . ' berhasil direset.');
    }

    // ===== Audit Log =====
    public function auditLog(Request $request)
    {
        $logs = AuditLog::with('user')
            ->orderBy('created_at', 'desc')
            ->paginate(25)->withQueryString();

        return Inertia::render('Admin/Keamanan/AuditLog', ['logs' => $logs]);
    }

    // ===== Keuangan =====
    public function keuangan(Request $request)
    {
        $billings = Billing::with(['mahasiswa.programStudy', 'semester', 'payments'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('created_at', 'desc')
            ->paginate(20)->withQueryString();

        $stats = [
            'totalTagihan' => Billing::whereIn('status', ['unpaid', 'overdue'])->sum('amount'),
            'totalLunas' => Billing::where('status', 'paid')->sum('amount'),
            'totalOverdue' => Billing::where('status', 'overdue')->count(),
        ];

        return Inertia::render('Admin/Keuangan/Index', [
            'billings' => $billings,
            'stats' => $stats,
            'filters' => $request->only(['status']),
        ]);
    }

    // ===== Pengumuman =====
    public function pengumuman(Request $request)
    {
        $announcements = Announcement::with('author')
            ->orderBy('is_pinned', 'desc')
            ->orderBy('created_at', 'desc')
            ->paginate(15);

        return Inertia::render('Admin/Layanan/Pengumuman', ['announcements' => $announcements]);
    }

    public function createPengumuman(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'content' => ['required', 'string'],
            'target_role' => ['required', 'in:all,mahasiswa,dosen,admin'],
        ]);

        Announcement::create([
            'title' => $request->title,
            'content' => $request->content,
            'author_id' => $request->user()->id,
            'target_role' => $request->target_role,
            'is_published' => true,
            'published_at' => now(),
        ]);

        return redirect()->back()->with('success', 'Pengumuman berhasil dibuat.');
    }

    // ===== Helpdesk =====
    public function helpdesk(Request $request)
    {
        $tickets = HelpdeskTicket::with(['user', 'assignee'])
            ->when($request->status, fn ($q, $s) => $q->where('status', $s))
            ->orderBy('created_at', 'desc')
            ->paginate(20)->withQueryString();

        return Inertia::render('Admin/Layanan/Helpdesk', [
            'tickets' => $tickets,
            'filters' => $request->only(['status']),
        ]);
    }
}
