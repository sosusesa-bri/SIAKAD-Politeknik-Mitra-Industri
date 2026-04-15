<?php

namespace App\Http\Controllers\Dosen;

use App\Http\Controllers\Controller;
use App\Models\Evaluation;
use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EvaluasiDosenController extends Controller
{
    public function index(Request $request)
    {
        $dosen = $request->user()->dosen;
        $activeSemester = Semester::active();

        $evaluations = Evaluation::where('semester_id', $activeSemester?->id)
            ->where(function ($q) { $q->where('target_role', 'dosen')->orWhere('target_role', 'all'); })
            ->withCount('responses')
            ->with('questions')
            ->get();

        return Inertia::render('Dosen/Evaluasi/Index', [
            'evaluations' => $evaluations,
            'activeSemester' => $activeSemester,
        ]);
    }
}
