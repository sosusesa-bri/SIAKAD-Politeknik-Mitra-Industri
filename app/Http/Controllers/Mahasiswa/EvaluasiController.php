<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\EvaluationCompletion;
use App\Models\EvaluationResponse;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvaluasiController extends Controller
{
    public function index(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $activeSemester = Semester::active();

        $evaluations = Evaluation::where('semester_id', $activeSemester?->id)
            ->where('is_active', true)
            ->where(function ($q) { $q->where('target_role', 'mahasiswa')->orWhere('target_role', 'all'); })
            ->with('questions')
            ->get()
            ->map(function ($eval) use ($mahasiswa) {
                $completed = EvaluationCompletion::where('evaluation_id', $eval->id)
                    ->where('user_id', $mahasiswa->user_id)->exists();
                return ['evaluation' => $eval, 'completed' => $completed];
            });

        return Inertia::render('Mahasiswa/Evaluasi/Index', [
            'evaluations' => $evaluations,
            'activeSemester' => $activeSemester,
        ]);
    }

    public function show(Evaluation $evaluation)
    {
        $mahasiswa = auth()->user()->mahasiswa;
        $alreadyCompleted = EvaluationCompletion::where('evaluation_id', $evaluation->id)
            ->where('user_id', $mahasiswa->user_id)->exists();

        if ($alreadyCompleted) {
            return redirect()->route('mahasiswa.evaluasi.index')
                ->with('warning', 'Anda sudah mengisi evaluasi ini.');
        }

        $evaluation->load('questions');

        return Inertia::render('Mahasiswa/Evaluasi/Show', [
            'evaluation' => $evaluation,
        ]);
    }

    /**
     * Store response — ANONYMOUS: responses stored without user linkage.
     */
    public function store(Request $request, Evaluation $evaluation)
    {
        $mahasiswa = $request->user()->mahasiswa;

        $request->validate([
            'responses' => ['required', 'array'],
            'responses.*.question_id' => ['required', 'exists:evaluation_questions,id'],
            'responses.*.answer' => ['required'],
        ]);

        // Store anonymous responses (no user_id in responses table)
        foreach ($request->responses as $resp) {
            EvaluationResponse::create([
                'evaluation_id' => $evaluation->id,
                'question_id' => $resp['question_id'],
                'answer' => $resp['answer'],
                'comment' => $resp['comment'] ?? null,
            ]);
        }

        // Mark completion (separate from responses — preserves anonymity)
        EvaluationCompletion::create([
            'evaluation_id' => $evaluation->id,
            'user_id' => $mahasiswa->user_id,
            'completed_at' => now(),
        ]);

        return redirect()->route('mahasiswa.evaluasi.index')
            ->with('success', 'Evaluasi berhasil disimpan. Terima kasih atas partisipasi Anda.');
    }
}
