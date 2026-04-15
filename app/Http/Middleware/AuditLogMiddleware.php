<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\Response;

class AuditLogMiddleware
{
    /**
     * Important actions to track automatically.
     */
    protected array $trackMethods = ['POST', 'PUT', 'PATCH', 'DELETE'];

    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        if (
            $request->user() &&
            in_array($request->method(), $this->trackMethods) &&
            $response->isSuccessful()
        ) {
            $this->logActivity($request);
        }

        return $response;
    }

    /**
     * Log the activity to the audit_logs table.
     */
    protected function logActivity(Request $request): void
    {
        try {
            DB::table('audit_logs')->insert([
                'user_id' => $request->user()->id,
                'action' => strtolower($request->method()),
                'model_type' => null,
                'model_id' => null,
                'old_values' => null,
                'new_values' => null,
                'ip_address' => $request->ip(),
                'user_agent' => $request->userAgent(),
                'description' => $request->method() . ' ' . $request->path(),
                'created_at' => now(),
            ]);
        } catch (\Throwable $e) {
            // Silently fail - audit logging should never break the app
            logger()->warning('Audit log failed: ' . $e->getMessage());
        }
    }
}
