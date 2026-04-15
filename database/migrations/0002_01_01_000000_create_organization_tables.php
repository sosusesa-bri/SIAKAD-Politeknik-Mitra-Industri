<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Faculties
        Schema::create('faculties', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name');
            $table->unsignedBigInteger('dean_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Departments
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('faculty_id')->constrained('faculties')->cascadeOnDelete();
            $table->string('code', 10)->unique();
            $table->string('name');
            $table->unsignedBigInteger('head_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Program Studies
        Schema::create('program_studies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('department_id')->constrained('departments')->cascadeOnDelete();
            $table->string('code', 10)->unique();
            $table->string('name');
            $table->enum('degree_level', ['D3', 'D4', 'S1', 'S2'])->default('D4');
            $table->string('accreditation', 10)->nullable();
            $table->unsignedBigInteger('head_id')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Dosen
        Schema::create('dosen', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('nip', 30)->unique();
            $table->string('nidn', 20)->nullable()->unique();
            $table->string('name');
            $table->foreignId('department_id')->nullable()->constrained('departments')->nullOnDelete();
            $table->string('position', 100)->nullable()->comment('Jabatan fungsional');
            $table->string('specialization')->nullable();
            $table->string('education', 50)->nullable()->comment('Pendidikan terakhir');
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->string('phone', 20)->nullable();
            $table->text('address')->nullable();
            $table->string('photo')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Add foreign keys to faculties and departments for dean/head
        Schema::table('faculties', function (Blueprint $table) {
            $table->foreign('dean_id')->references('id')->on('dosen')->nullOnDelete();
        });
        Schema::table('departments', function (Blueprint $table) {
            $table->foreign('head_id')->references('id')->on('dosen')->nullOnDelete();
        });
        Schema::table('program_studies', function (Blueprint $table) {
            $table->foreign('head_id')->references('id')->on('dosen')->nullOnDelete();
        });

        // Curricula
        Schema::create('curricula', function (Blueprint $table) {
            $table->id();
            $table->foreignId('program_study_id')->constrained('program_studies')->cascadeOnDelete();
            $table->string('code', 20)->unique();
            $table->string('name');
            $table->year('year');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Mahasiswa
        Schema::create('mahasiswa', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->unique()->constrained('users')->cascadeOnDelete();
            $table->string('nim', 20)->unique();
            $table->string('name');
            $table->foreignId('program_study_id')->constrained('program_studies');
            $table->foreignId('curriculum_id')->constrained('curricula');
            $table->year('class_year')->comment('Angkatan');
            $table->tinyInteger('semester_active')->default(1);
            $table->enum('academic_status', ['aktif', 'cuti', 'lulus', 'drop_out', 'non_aktif'])->default('aktif');
            $table->unsignedBigInteger('dosen_wali_id')->nullable();
            $table->foreign('dosen_wali_id')->references('id')->on('dosen')->nullOnDelete();
            $table->string('birth_place', 100)->nullable();
            $table->date('birth_date')->nullable();
            $table->enum('gender', ['L', 'P'])->nullable();
            $table->text('address')->nullable();
            $table->string('phone', 20)->nullable();
            $table->string('parent_name')->nullable();
            $table->string('parent_phone', 20)->nullable();
            $table->date('entry_date');
            $table->tinyInteger('max_sks')->default(24);
            $table->decimal('ipk', 4, 2)->default(0.00);
            $table->unsignedInteger('total_sks_passed')->default(0);
            $table->string('photo')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('mahasiswa');
        Schema::dropIfExists('curricula');
        Schema::table('program_studies', function (Blueprint $table) {
            $table->dropForeign(['head_id']);
        });
        Schema::table('departments', function (Blueprint $table) {
            $table->dropForeign(['head_id']);
        });
        Schema::table('faculties', function (Blueprint $table) {
            $table->dropForeign(['dean_id']);
        });
        Schema::dropIfExists('dosen');
        Schema::dropIfExists('program_studies');
        Schema::dropIfExists('departments');
        Schema::dropIfExists('faculties');
    }
};
