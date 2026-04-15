<?php

namespace Database\Seeders;

use App\Enums\UserRole;
use App\Models\AcademicCalendar;
use App\Models\AcademicYear;
use App\Models\Classroom;
use App\Models\Course;
use App\Models\Curriculum;
use App\Models\Department;
use App\Models\Dosen;
use App\Models\Faculty;
use App\Models\Kelas;
use App\Models\Mahasiswa;
use App\Models\ProgramStudy;
use App\Models\Schedule;
use App\Models\Semester;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // ================================================
        // 1. Admin User
        // ================================================
        $adminUser = User::create([
            'identifier' => 'admin',
            'name' => 'Administrator SIAKAD',
            'email' => 'admin@polmind.ac.id',
            'password' => Hash::make('password'),
            'role' => UserRole::ADMIN,
            'is_active' => true,
        ]);

        // ================================================
        // 2. Faculty & Departments
        // ================================================
        $faculty = Faculty::create([
            'code' => 'FTI',
            'name' => 'Politeknik Mitra Industri',
            'is_active' => true,
        ]);

        $deptTI = Department::create([
            'faculty_id' => $faculty->id,
            'code' => 'TI',
            'name' => 'Teknologi Informasi',
            'is_active' => true,
        ]);

        $deptTM = Department::create([
            'faculty_id' => $faculty->id,
            'code' => 'TM',
            'name' => 'Teknologi Manufaktur',
            'is_active' => true,
        ]);

        $deptBD = Department::create([
            'faculty_id' => $faculty->id,
            'code' => 'BD',
            'name' => 'Bisnis & Digital',
            'is_active' => true,
        ]);

        // ================================================
        // 3. Program Studies (3 Prodi)
        // ================================================
        $prodiTRPL = ProgramStudy::create([
            'department_id' => $deptTI->id,
            'code' => 'TRPL',
            'name' => 'Teknologi Rekayasa Perangkat Lunak',
            'degree_level' => 'D4',
            'accreditation' => 'B',
            'is_active' => true,
        ]);

        $prodiTRM = ProgramStudy::create([
            'department_id' => $deptTM->id,
            'code' => 'TRM',
            'name' => 'Teknologi Rekayasa Manufaktur',
            'degree_level' => 'D4',
            'accreditation' => 'B',
            'is_active' => true,
        ]);

        $prodiBD = ProgramStudy::create([
            'department_id' => $deptBD->id,
            'code' => 'BISDIG',
            'name' => 'Bisnis Digital',
            'degree_level' => 'D4',
            'accreditation' => 'B',
            'is_active' => true,
        ]);

        // ================================================
        // 4. Curricula
        // ================================================
        $kurTRPL = Curriculum::create([
            'program_study_id' => $prodiTRPL->id,
            'code' => 'KUR-TRPL-2024',
            'name' => 'Kurikulum TRPL 2024',
            'year' => 2024,
            'is_active' => true,
        ]);

        $kurTRM = Curriculum::create([
            'program_study_id' => $prodiTRM->id,
            'code' => 'KUR-TRM-2024',
            'name' => 'Kurikulum TRM 2024',
            'year' => 2024,
            'is_active' => true,
        ]);

        $kurBD = Curriculum::create([
            'program_study_id' => $prodiBD->id,
            'code' => 'KUR-BD-2024',
            'name' => 'Kurikulum Bisnis Digital 2024',
            'year' => 2024,
            'is_active' => true,
        ]);

        // ================================================
        // 5. Dosen (6 dosen, 2 per prodi)
        // ================================================
        $dosenData = [
            ['nip' => '198501012010011001', 'name' => 'Dr. Budi Santoso, M.Kom.', 'dept' => $deptTI, 'pos' => 'Lektor Kepala', 'spec' => 'Software Engineering', 'edu' => 'S3'],
            ['nip' => '198703152011012002', 'name' => 'Siti Rahayu, M.T.', 'dept' => $deptTI, 'pos' => 'Lektor', 'spec' => 'Web Development', 'edu' => 'S2'],
            ['nip' => '198206252009011003', 'name' => 'Ir. Ahmad Fauzi, M.Eng.', 'dept' => $deptTM, 'pos' => 'Lektor Kepala', 'spec' => 'Manufacturing Systems', 'edu' => 'S2'],
            ['nip' => '199001102013022004', 'name' => 'Diana Permata, M.T.', 'dept' => $deptTM, 'pos' => 'Asisten Ahli', 'spec' => 'Mechanical Design', 'edu' => 'S2'],
            ['nip' => '198812202012011005', 'name' => 'Hendro Wicaksono, M.M.', 'dept' => $deptBD, 'pos' => 'Lektor', 'spec' => 'Digital Marketing', 'edu' => 'S2'],
            ['nip' => '199205142015022006', 'name' => 'Rina Kartika, M.Ak.', 'dept' => $deptBD, 'pos' => 'Asisten Ahli', 'spec' => 'Financial Technology', 'edu' => 'S2'],
        ];

        $dosenModels = [];
        foreach ($dosenData as $d) {
            $dosenUser = User::create([
                'identifier' => $d['nip'],
                'name' => $d['name'],
                'email' => strtolower(str_replace([' ', '.', ','], '', explode(',', $d['name'])[0])) . '@polmind.ac.id',
                'password' => Hash::make('password'),
                'role' => UserRole::DOSEN,
                'is_active' => true,
            ]);

            $dosenModels[] = Dosen::create([
                'user_id' => $dosenUser->id,
                'nip' => $d['nip'],
                'name' => $d['name'],
                'department_id' => $d['dept']->id,
                'position' => $d['pos'],
                'specialization' => $d['spec'],
                'education' => $d['edu'],
                'gender' => 'L',
                'is_active' => true,
            ]);
        }

        // ================================================
        // 6. Courses (TRPL example — semester 1-2)
        // ================================================
        $trplCourses = [
            ['code' => 'TRPL101', 'name' => 'Algoritma dan Pemrograman', 'teori' => 2, 'praktik' => 1, 'sem' => 1],
            ['code' => 'TRPL102', 'name' => 'Matematika Diskrit', 'teori' => 3, 'praktik' => 0, 'sem' => 1],
            ['code' => 'TRPL103', 'name' => 'Pengantar Teknologi Informasi', 'teori' => 2, 'praktik' => 1, 'sem' => 1],
            ['code' => 'TRPL104', 'name' => 'Bahasa Inggris I', 'teori' => 2, 'praktik' => 0, 'sem' => 1],
            ['code' => 'TRPL105', 'name' => 'Kalkulus', 'teori' => 3, 'praktik' => 0, 'sem' => 1],
            ['code' => 'TRPL201', 'name' => 'Struktur Data', 'teori' => 2, 'praktik' => 1, 'sem' => 2],
            ['code' => 'TRPL202', 'name' => 'Basis Data', 'teori' => 2, 'praktik' => 1, 'sem' => 2],
            ['code' => 'TRPL203', 'name' => 'Pemrograman Web', 'teori' => 1, 'praktik' => 2, 'sem' => 2],
            ['code' => 'TRPL204', 'name' => 'Sistem Operasi', 'teori' => 2, 'praktik' => 1, 'sem' => 2],
            ['code' => 'TRPL205', 'name' => 'Statistika', 'teori' => 3, 'praktik' => 0, 'sem' => 2],
            // Semester 5+ (non-package)
            ['code' => 'TRPL501', 'name' => 'Rekayasa Perangkat Lunak Lanjut', 'teori' => 2, 'praktik' => 1, 'sem' => 5, 'package' => false],
            ['code' => 'TRPL502', 'name' => 'Pengembangan Aplikasi Mobile', 'teori' => 1, 'praktik' => 2, 'sem' => 5, 'package' => false],
            ['code' => 'TRPL503', 'name' => 'Keamanan Siber', 'teori' => 2, 'praktik' => 1, 'sem' => 5, 'package' => false],
        ];

        foreach ($trplCourses as $c) {
            Course::create([
                'curriculum_id' => $kurTRPL->id,
                'code' => $c['code'],
                'name' => $c['name'],
                'sks_teori' => $c['teori'],
                'sks_praktik' => $c['praktik'],
                'semester' => $c['sem'],
                'is_package' => $c['package'] ?? ($c['sem'] <= 4),
                'is_active' => true,
            ]);
        }

        // ================================================
        // 7. Academic Year & Semester
        // ================================================
        $ay = AcademicYear::create([
            'code' => '2025/2026',
            'name' => 'Tahun Akademik 2025/2026',
            'start_date' => '2025-09-01',
            'end_date' => '2026-08-31',
            'is_active' => true,
        ]);

        $semGanjil = Semester::create([
            'academic_year_id' => $ay->id,
            'code' => '20251',
            'name' => 'Ganjil 2025/2026',
            'type' => 'ganjil',
            'start_date' => '2025-09-01',
            'end_date' => '2026-02-28',
            'krs_start' => '2025-08-15',
            'krs_end' => '2025-09-15',
            'uts_start' => '2025-10-20',
            'uts_end' => '2025-11-01',
            'uas_start' => '2026-01-05',
            'uas_end' => '2026-01-17',
            'is_active' => true,
        ]);

        $semGenap = Semester::create([
            'academic_year_id' => $ay->id,
            'code' => '20252',
            'name' => 'Genap 2025/2026',
            'type' => 'genap',
            'start_date' => '2026-03-01',
            'end_date' => '2026-08-31',
            'krs_start' => '2026-02-15',
            'krs_end' => '2026-03-15',
            'is_active' => false,
        ]);

        // Academic Calendar Events
        $calendarEvents = [
            ['title' => 'Registrasi Semester Ganjil', 'type' => 'registrasi', 'start' => '2025-08-15', 'end' => '2025-09-15'],
            ['title' => 'Perkuliahan Dimulai', 'type' => 'perkuliahan', 'start' => '2025-09-01', 'end' => '2025-09-01'],
            ['title' => 'Ujian Tengah Semester', 'type' => 'ujian', 'start' => '2025-10-20', 'end' => '2025-11-01'],
            ['title' => 'Ujian Akhir Semester', 'type' => 'ujian', 'start' => '2026-01-05', 'end' => '2026-01-17'],
            ['title' => 'Libur Semester', 'type' => 'libur', 'start' => '2026-01-18', 'end' => '2026-02-28'],
        ];

        foreach ($calendarEvents as $event) {
            AcademicCalendar::create([
                'semester_id' => $semGanjil->id,
                'title' => $event['title'],
                'type' => $event['type'],
                'start_date' => $event['start'],
                'end_date' => $event['end'],
            ]);
        }

        // ================================================
        // 8. Classrooms
        // ================================================
        $rooms = [
            ['code' => 'R-101', 'name' => 'Ruang 101', 'building' => 'Gedung A', 'floor' => '1', 'capacity' => 40, 'type' => 'teori'],
            ['code' => 'R-201', 'name' => 'Ruang 201', 'building' => 'Gedung A', 'floor' => '2', 'capacity' => 40, 'type' => 'teori'],
            ['code' => 'LAB-01', 'name' => 'Lab Komputer 1', 'building' => 'Gedung B', 'floor' => '1', 'capacity' => 30, 'type' => 'lab'],
            ['code' => 'LAB-02', 'name' => 'Lab Komputer 2', 'building' => 'Gedung B', 'floor' => '1', 'capacity' => 30, 'type' => 'lab'],
            ['code' => 'LAB-MFG', 'name' => 'Lab Manufaktur', 'building' => 'Gedung C', 'floor' => '1', 'capacity' => 25, 'type' => 'lab'],
        ];

        $classroomModels = [];
        foreach ($rooms as $r) {
            $classroomModels[] = Classroom::create($r);
        }

        // ================================================
        // 9. Kelas (Class Sections) for TRPL semester 1
        // ================================================
        $trplSem1Courses = Course::where('curriculum_id', $kurTRPL->id)->where('semester', 1)->get();
        $kelasModels = [];

        foreach ($trplSem1Courses as $i => $course) {
            $kelasModels[] = Kelas::create([
                'course_id' => $course->id,
                'semester_id' => $semGanjil->id,
                'dosen_id' => $dosenModels[$i % 2]->id,
                'code' => 'A',
                'name' => $course->name . ' - Kelas A',
                'capacity' => 35,
            ]);
        }

        // ================================================
        // 10. Schedules
        // ================================================
        $days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'];
        $times = [['08:00', '09:40'], ['10:00', '11:40'], ['13:00', '14:40'], ['15:00', '16:40']];

        foreach ($kelasModels as $i => $kelas) {
            Schedule::create([
                'kelas_id' => $kelas->id,
                'classroom_id' => $classroomModels[$i % count($classroomModels)]->id,
                'day' => $days[$i % count($days)],
                'start_time' => $times[$i % count($times)][0],
                'end_time' => $times[$i % count($times)][1],
            ]);
        }

        // ================================================
        // 11. Mahasiswa (3 per prodi = 9 total)
        // ================================================
        $mahasiswaData = [
            // TRPL
            ['nim' => '2024101001', 'name' => 'Andi Pratama', 'prodi' => $prodiTRPL, 'kur' => $kurTRPL, 'wali' => $dosenModels[0]],
            ['nim' => '2024101002', 'name' => 'Bella Safitri', 'prodi' => $prodiTRPL, 'kur' => $kurTRPL, 'wali' => $dosenModels[0]],
            ['nim' => '2024101003', 'name' => 'Charlie Wijaya', 'prodi' => $prodiTRPL, 'kur' => $kurTRPL, 'wali' => $dosenModels[1]],
            // TRM
            ['nim' => '2024102001', 'name' => 'Dika Setiawan', 'prodi' => $prodiTRM, 'kur' => $kurTRM, 'wali' => $dosenModels[2]],
            ['nim' => '2024102002', 'name' => 'Eka Permana', 'prodi' => $prodiTRM, 'kur' => $kurTRM, 'wali' => $dosenModels[2]],
            ['nim' => '2024102003', 'name' => 'Firda Amalia', 'prodi' => $prodiTRM, 'kur' => $kurTRM, 'wali' => $dosenModels[3]],
            // Bisnis Digital
            ['nim' => '2024103001', 'name' => 'Galih Ramadhan', 'prodi' => $prodiBD, 'kur' => $kurBD, 'wali' => $dosenModels[4]],
            ['nim' => '2024103002', 'name' => 'Hana Putri', 'prodi' => $prodiBD, 'kur' => $kurBD, 'wali' => $dosenModels[4]],
            ['nim' => '2024103003', 'name' => 'Ivan Kurniawan', 'prodi' => $prodiBD, 'kur' => $kurBD, 'wali' => $dosenModels[5]],
        ];

        foreach ($mahasiswaData as $m) {
            $mhsUser = User::create([
                'identifier' => $m['nim'],
                'name' => $m['name'],
                'email' => $m['nim'] . '@student.polmind.ac.id',
                'password' => Hash::make('password'),
                'role' => UserRole::MAHASISWA,
                'is_active' => true,
            ]);

            Mahasiswa::create([
                'user_id' => $mhsUser->id,
                'nim' => $m['nim'],
                'name' => $m['name'],
                'program_study_id' => $m['prodi']->id,
                'curriculum_id' => $m['kur']->id,
                'class_year' => 2024,
                'semester_active' => 1,
                'academic_status' => 'aktif',
                'dosen_wali_id' => $m['wali']->id,
                'gender' => in_array($m['name'], ['Bella Safitri', 'Eka Permana', 'Firda Amalia', 'Hana Putri']) ? 'P' : 'L',
                'entry_date' => '2024-09-01',
                'max_sks' => 24,
            ]);
        }

        // ================================================
        // 12. Announcements
        // ================================================
        \App\Models\Announcement::create([
            'title' => 'Selamat Datang di SIAKAD Polmind',
            'content' => 'Sistem Informasi Akademik Politeknik Mitra Industri telah aktif. Silakan gunakan NIM/NIP untuk login ke sistem.',
            'author_id' => $adminUser->id,
            'target_role' => 'all',
            'is_pinned' => true,
            'is_published' => true,
            'published_at' => now(),
        ]);

        \App\Models\Announcement::create([
            'title' => 'Jadwal Registrasi Semester Ganjil 2025/2026',
            'content' => 'Registrasi semester ganjil 2025/2026 dibuka mulai 15 Agustus hingga 15 September 2025. Pastikan Anda telah menyelesaikan pembayaran sebelum melakukan registrasi.',
            'author_id' => $adminUser->id,
            'target_role' => 'mahasiswa',
            'is_pinned' => false,
            'is_published' => true,
            'published_at' => now(),
        ]);
    }
}
