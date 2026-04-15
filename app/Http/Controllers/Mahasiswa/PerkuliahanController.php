<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PerkuliahanController extends Controller
{
    /**
     * Presensi & Rekap Kehadiran.
     */
    public function presensi(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $activeSemester = Semester::active();

        $attendances = collect();
        if ($activeSemester) {
            $attendances = $mahasiswa->attendances()
                ->whereHas('kelas', fn ($q) => $q->where('semester_id', $activeSemester->id))
                ->with(['kelas.course', 'schedule'])
                ->orderBy('date', 'desc')
                ->get()
                ->groupBy('kelas_id')
                ->map(function ($records) {
                    $kelas = $records->first()->kelas;
                    return [
                        'kelas' => $kelas,
                        'course' => $kelas->course,
                        'total' => $records->count(),
                        'hadir' => $records->where('status', 'hadir')->count(),
                        'izin' => $records->where('status', 'izin')->count(),
                        'sakit' => $records->where('status', 'sakit')->count(),
                        'alpha' => $records->where('status', 'alpha')->count(),
                        'percentage' => $records->count() > 0
                            ? round($records->where('status', 'hadir')->count() / $records->count() * 100, 1)
                            : 0,
                        'records' => $records->sortByDesc('date')->values(),
                    ];
                })->values();
        }

        return Inertia::render('Mahasiswa/Perkuliahan/Presensi', [
            'attendances' => $attendances,
            'activeSemester' => $activeSemester,
        ]);
    }
}
