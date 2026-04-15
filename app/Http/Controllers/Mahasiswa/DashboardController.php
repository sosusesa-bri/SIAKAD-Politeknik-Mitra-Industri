<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $mahasiswa = $user->mahasiswa()->with(['programStudy', 'dosenWali', 'curriculum'])->first();
        $activeSemester = Semester::active();

        // Get recent grades
        $recentGrades = $mahasiswa ? $mahasiswa->grades()
            ->with('course')
            ->latest()
            ->limit(5)
            ->get() : collect();

        // Get active KRS
        $activeKrs = $mahasiswa && $activeSemester ? $mahasiswa->krs()
            ->where('semester_id', $activeSemester->id)
            ->with('details.course')
            ->first() : null;

        // Billing summary
        $unpaidBillings = $mahasiswa ? $mahasiswa->billings()
            ->whereIn('status', ['unpaid', 'overdue'])
            ->sum('amount') : 0;

        return Inertia::render('Mahasiswa/Dashboard', [
            'mahasiswa' => $mahasiswa,
            'activeSemester' => $activeSemester,
            'recentGrades' => $recentGrades,
            'activeKrs' => $activeKrs,
            'unpaidBillings' => $unpaidBillings,
            'stats' => [
                'ipk' => $mahasiswa?->ipk ?? 0,
                'totalSks' => $mahasiswa?->total_sks_passed ?? 0,
                'semesterActive' => $mahasiswa?->semester_active ?? 1,
                'academicStatus' => $mahasiswa?->academic_status ?? 'aktif',
            ],
        ]);
    }
}
