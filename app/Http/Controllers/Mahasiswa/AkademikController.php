<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AkademikController extends Controller
{
    /**
     * KHS (Kartu Hasil Studi) — view grades per semester + cumulative transcript.
     */
    public function khs(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa()->with(['programStudy'])->first();
        $activeSemester = Semester::active();

        $selectedSemesterId = $request->get('semester_id', $activeSemester?->id);

        // All semesters where this student has grades
        $availableSemesters = Semester::whereHas('kelas.grades', function ($q) use ($mahasiswa) {
            $q->where('mahasiswa_id', $mahasiswa->id);
        })->orderBy('code')->get();

        // KHS for selected semester
        $grades = Grade::where('mahasiswa_id', $mahasiswa->id)
            ->where('semester_id', $selectedSemesterId)
            ->with(['course', 'kelas'])
            ->get();

        // Calculate IPS
        $ips = $mahasiswa->calculateIps($selectedSemesterId);

        return Inertia::render('Mahasiswa/Akademik/Khs', [
            'mahasiswa' => $mahasiswa,
            'grades' => $grades,
            'ips' => $ips,
            'ipk' => $mahasiswa->ipk,
            'selectedSemesterId' => (int) $selectedSemesterId,
            'availableSemesters' => $availableSemesters,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Transkrip Nilai Sementara.
     */
    public function transkrip(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa()->with(['programStudy', 'curriculum'])->first();

        // All grades grouped by semester
        $allGrades = Grade::where('mahasiswa_id', $mahasiswa->id)
            ->whereNotNull('grade_letter')
            ->with(['course', 'semester'])
            ->get()
            ->groupBy('semester_id');

        $semesters = Semester::whereIn('id', $allGrades->keys())->orderBy('code')->get();

        $transcript = $semesters->map(function ($semester) use ($allGrades, $mahasiswa) {
            $semGrades = $allGrades->get($semester->id, collect());
            return [
                'semester' => $semester,
                'grades' => $semGrades,
                'ips' => $mahasiswa->calculateIps($semester->id),
                'totalSks' => $semGrades->sum(fn ($g) => $g->course->sks_teori + $g->course->sks_praktik),
            ];
        });

        return Inertia::render('Mahasiswa/Akademik/Transkrip', [
            'mahasiswa' => $mahasiswa,
            'transcript' => $transcript,
            'ipk' => $mahasiswa->ipk,
            'totalSks' => $mahasiswa->total_sks_passed,
        ]);
    }

    /**
     * KRS (Kartu Rencana Studi).
     */
    public function krs(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa()->with(['programStudy', 'curriculum'])->first();
        $activeSemester = Semester::active();

        // Current KRS
        $krs = $mahasiswa->krs()
            ->where('semester_id', $activeSemester?->id)
            ->with(['details.course', 'details.kelas.schedules.classroom', 'details.kelas.dosen'])
            ->first();

        // Is KRS period active?
        $krsOpen = $activeSemester &&
            $activeSemester->krs_start &&
            $activeSemester->krs_end &&
            now()->between($activeSemester->krs_start, $activeSemester->krs_end);

        return Inertia::render('Mahasiswa/Akademik/Krs', [
            'mahasiswa' => $mahasiswa,
            'krs' => $krs,
            'activeSemester' => $activeSemester,
            'krsOpen' => $krsOpen,
            'maxSks' => $mahasiswa->max_sks,
        ]);
    }

    /**
     * Jadwal Kuliah.
     */
    public function jadwalKuliah(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $activeSemester = Semester::active();

        // Get enrolled classes
        $enrolledKelas = [];
        if ($activeSemester) {
            $krs = $mahasiswa->krs()
                ->where('semester_id', $activeSemester->id)
                ->with(['details.kelas.schedules.classroom', 'details.kelas.dosen', 'details.course'])
                ->first();

            if ($krs) {
                $enrolledKelas = $krs->details
                    ->where('status', 'active')
                    ->map(function ($detail) {
                        return [
                            'course' => $detail->course,
                            'kelas' => $detail->kelas,
                            'schedules' => $detail->kelas->schedules,
                            'dosen' => $detail->kelas->dosen,
                        ];
                    })->values();
            }
        }

        return Inertia::render('Mahasiswa/Akademik/JadwalKuliah', [
            'enrolledKelas' => $enrolledKelas,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Jadwal Ujian.
     */
    public function jadwalUjian(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $activeSemester = Semester::active();

        $examSchedules = collect();
        if ($activeSemester) {
            $krs = $mahasiswa->krs()
                ->where('semester_id', $activeSemester->id)
                ->first();

            if ($krs) {
                $kelasIds = $krs->details()->pluck('kelas_id');
                $examSchedules = \App\Models\ExamSchedule::whereIn('kelas_id', $kelasIds)
                    ->with(['kelas.course', 'classroom'])
                    ->orderBy('date')
                    ->get();
            }
        }

        return Inertia::render('Mahasiswa/Akademik/JadwalUjian', [
            'examSchedules' => $examSchedules,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Status Akademik.
     */
    public function statusAkademik(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa()
            ->with(['programStudy', 'curriculum', 'dosenWali', 'registrations.semester'])
            ->first();

        return Inertia::render('Mahasiswa/Akademik/StatusAkademik', [
            'mahasiswa' => $mahasiswa,
        ]);
    }

    /**
     * Kalender Akademik.
     */
    public function kalenderAkademik(Request $request)
    {
        $activeSemester = Semester::active();
        $events = [];

        if ($activeSemester) {
            $events = \App\Models\AcademicCalendar::where('semester_id', $activeSemester->id)
                ->orderBy('start_date')
                ->get();
        }

        return Inertia::render('Mahasiswa/Akademik/KalenderAkademik', [
            'events' => $events,
            'activeSemester' => $activeSemester,
        ]);
    }
}
