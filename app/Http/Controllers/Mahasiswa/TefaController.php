<?php

namespace App\Http\Controllers\Mahasiswa;

use App\Http\Controllers\Controller;
use App\Models\TefaProject;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TefaController extends Controller
{
    public function index(Request $request)
    {
        $mahasiswa = $request->user()->mahasiswa;
        $projects = TefaProject::whereHas('members', fn ($q) => $q->where('mahasiswa_id', $mahasiswa->id))
            ->with(['members.mahasiswa', 'logbooks', 'proposals', 'reports'])
            ->orderBy('created_at', 'desc')
            ->get();

        return Inertia::render('Mahasiswa/Tefa/Index', [
            'projects' => $projects,
        ]);
    }
}
