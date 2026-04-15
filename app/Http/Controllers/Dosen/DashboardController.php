<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        $dosen = $user->dosen()->with('department')->first();
        $activeSemester = Semester::active();

        // Teaching classes this semester
        $teachingClasses = $dosen && $activeSemester ? $dosen->kelas()
            ->where('semester_id', $activeSemester->id)
            ->with(['course', 'schedules.classroom'])
            ->get() : collect();

        // Students under guidance (wali)
        $guidanceStudents = $dosen ? $dosen->mahasiswaBimbingan()
            ->where('academic_status', 'aktif')
            ->count() : 0;

        // Pending KRS approvals
        $pendingKrs = $dosen ? \App\Models\Krs::where('approved_by', null)
            ->whereHas('mahasiswa', fn ($q) => $q->where('dosen_wali_id', $dosen->id))
            ->where('status', 'submitted')
            ->count() : 0;

        return Inertia::render('Dosen/Dashboard', [
            'dosen' => $dosen,
            'activeSemester' => $activeSemester,
            'teachingClasses' => $teachingClasses,
            'stats' => [
                'totalClasses' => $teachingClasses->count(),
                'guidanceStudents' => $guidanceStudents,
                'pendingKrs' => $pendingKrs,
            ],
        ]);
    }
}
