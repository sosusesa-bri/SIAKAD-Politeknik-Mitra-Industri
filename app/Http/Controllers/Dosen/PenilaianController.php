<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Grade;
use App\Models\Kelas;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PenilaianController extends Controller
{
    /**
     * List of classes for grading.
     */
    public function index(Request $request)
    {
        $dosen = $request->user()->dosen;
        $activeSemester = Semester::active();

        $kelasList = $dosen->kelas()
            ->where('semester_id', $activeSemester?->id)
            ->with(['course', 'semester'])
            ->get();

        return Inertia::render('Dosen/Penilaian/Index', [
            'kelasList' => $kelasList,
            'activeSemester' => $activeSemester,
        ]);
    }

    /**
     * Show grading form for a specific class.
     */
    public function show(Request $request, Kelas $kela)
    {
        $dosen = $request->user()->dosen;
        
        // Ensure dosen owns this class
        if ($kela->dosen_id !== $dosen->id) {
            abort(403);
        }

        $kela->load(['course', 'semester']);

        // Get students in this class via KRS
        $students = $kela->krsDetails()
            ->where('status', 'active')
            ->with('krs.mahasiswa')
            ->get()
            ->map(function ($detail) use ($kela) {
                $mhs = $detail->krs->mahasiswa;
                $grade = Grade::where('mahasiswa_id', $mhs->id)
                    ->where('kelas_id', $kela->id)
                    ->first();
                
                return [
                    'mahasiswa' => $mhs,
                    'grade' => $grade,
                ];
            });

        return Inertia::render('Dosen/Penilaian/Show', [
            'kelas' => $kela,
            'students' => $students,
        ]);
    }

    /**
     * Store/update grades for the class.
     */
    public function store(Request $request, Kelas $kela)
    {
        $dosen = $request->user()->dosen;
        if ($kela->dosen_id !== $dosen->id) {
            abort(403);
        }

        $request->validate([
            'grades' => ['required', 'array'],
            'grades.*.mahasiswa_id' => ['required', 'exists:mahasiswa,id'],
            'grades.*.tugas' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'grades.*.uts' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'grades.*.uas' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'grades.*.praktik' => ['nullable', 'numeric', 'min:0', 'max:100'],
        ]);

        foreach ($request->grades as $gradeData) {
            // Calculate final score: 20% tugas, 30% UTS, 40% UAS, 10% praktik
            $tugas = $gradeData['tugas'] ?? 0;
            $uts = $gradeData['uts'] ?? 0;
            $uas = $gradeData['uas'] ?? 0;
            $praktik = $gradeData['praktik'] ?? 0;
            
            $finalScore = ($tugas * 0.20) + ($uts * 0.30) + ($uas * 0.40) + ($praktik * 0.10);
            $gradeLetter = Grade::scoreToLetter($finalScore);
            $gradePoint = Grade::letterToPoint($gradeLetter);

            Grade::updateOrCreate(
                [
                    'mahasiswa_id' => $gradeData['mahasiswa_id'],
                    'kelas_id' => $kela->id,
                ],
                [
                    'course_id' => $kela->course_id,
                    'semester_id' => $kela->semester_id,
                    'tugas' => $gradeData['tugas'],
                    'uts' => $gradeData['uts'],
                    'uas' => $gradeData['uas'],
                    'praktik' => $gradeData['praktik'],
                    'final_score' => round($finalScore, 2),
                    'grade_letter' => $gradeLetter,
                    'grade_point' => $gradePoint,
                ]
            );
        }

        return redirect()->back()->with('success', 'Nilai berhasil disimpan.');
    }

    /**
     * Verify grades for the class.
     */
    public function verify(Request $request, Kelas $kela)
    {
        $dosen = $request->user()->dosen;
        if ($kela->dosen_id !== $dosen->id) {
            abort(403);
        }

        Grade::where('kelas_id', $kela->id)
            ->whereNotNull('final_score')
            ->update([
                'is_verified' => true,
                'verified_by' => $dosen->id,
                'verified_at' => now(),
            ]);

        return redirect()->back()->with('success', 'Nilai sudah diverifikasi.');
    }
}
