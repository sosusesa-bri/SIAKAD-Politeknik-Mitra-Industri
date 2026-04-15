<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Enums\UserRole;
use App\Models\Mahasiswa;
use App\Models\ProgramStudy;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class MahasiswaController extends Controller
{
    public function index(Request $request)
    {
        $query = Mahasiswa::with(['programStudy', 'user', 'dosenWali'])
            ->when($request->search, fn ($q, $s) => $q->where('name', 'like', "%{$s}%")->orWhere('nim', 'like', "%{$s}%"))
            ->when($request->prodi, fn ($q, $p) => $q->where('program_study_id', $p))
            ->when($request->status, fn ($q, $s) => $q->where('academic_status', $s))
            ->orderBy('nim');

        return Inertia::render('Admin/MasterData/Mahasiswa/Index', [
            'mahasiswa' => $query->paginate(15)->withQueryString(),
            'filters' => $request->only(['search', 'prodi', 'status']),
            'prodiList' => ProgramStudy::where('is_active', true)->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/MasterData/Mahasiswa/Create', [
            'prodiList' => ProgramStudy::with('department')->where('is_active', true)->get(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nim' => ['required', 'string', 'unique:mahasiswa,nim'],
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'email', 'unique:users,email'],
            'program_study_id' => ['required', 'exists:program_studies,id'],
            'class_year' => ['required', 'integer'],
            'gender' => ['required', 'in:L,P'],
        ]);

        $user = User::create([
            'identifier' => $request->nim,
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make('password'),
            'role' => UserRole::MAHASISWA,
            'is_active' => true,
        ]);

        Mahasiswa::create([
            'user_id' => $user->id,
            'nim' => $request->nim,
            'name' => $request->name,
            'program_study_id' => $request->program_study_id,
            'class_year' => $request->class_year,
            'gender' => $request->gender,
            'entry_date' => now(),
            'semester_active' => 1,
            'academic_status' => 'aktif',
            'max_sks' => 24,
        ]);

        return redirect()->route('admin.master-data.mahasiswa.index')
            ->with('success', 'Mahasiswa ' . $request->name . ' berhasil ditambahkan.');
    }

    public function edit(Mahasiswa $mahasiswa)
    {
        $mahasiswa->load(['user', 'programStudy']);
        return Inertia::render('Admin/MasterData/Mahasiswa/Edit', [
            'mahasiswa' => $mahasiswa,
            'prodiList' => ProgramStudy::where('is_active', true)->get(),
        ]);
    }

    public function update(Request $request, Mahasiswa $mahasiswa)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'program_study_id' => ['required', 'exists:program_studies,id'],
            'academic_status' => ['required', 'in:aktif,cuti,lulus,drop_out,non_aktif'],
            'max_sks' => ['required', 'integer', 'min:1', 'max:30'],
        ]);

        $mahasiswa->update($request->only(['name', 'program_study_id', 'academic_status', 'max_sks', 'semester_active']));
        $mahasiswa->user->update(['name' => $request->name]);

        return redirect()->route('admin.master-data.mahasiswa.index')
            ->with('success', 'Data mahasiswa berhasil diperbarui.');
    }
}
