<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Courses
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('curriculum_id')->constrained('curricula')->cascadeOnDelete();
            $table->string('code', 20)->unique();
            $table->string('name');
            $table->tinyInteger('sks_teori')->default(0);
            $table->tinyInteger('sks_praktik')->default(0);
            $table->tinyInteger('semester')->comment('Semester rekomendasi');
            $table->boolean('is_package')->default(true)->comment('true=paket (sem 1-4), false=pilihan (sem 5+)');
            $table->boolean('is_active')->default(true);
            $table->text('description')->nullable();
            $table->timestamps();
        });

        // Course Prerequisites
        Schema::create('course_prerequisites', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignId('prerequisite_course_id')->constrained('courses')->cascadeOnDelete();
            $table->char('min_grade', 2)->default('D');
            $table->timestamps();
            $table->unique(['course_id', 'prerequisite_course_id']);
        });

        // Academic Years
        Schema::create('academic_years', function (Blueprint $table) {
            $table->id();
            $table->string('code', 10)->unique();
            $table->string('name', 50);
            $table->date('start_date');
            $table->date('end_date');
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });

        // Semesters
        Schema::create('semesters', function (Blueprint $table) {
            $table->id();
            $table->foreignId('academic_year_id')->constrained('academic_years')->cascadeOnDelete();
            $table->string('code', 10)->unique();
            $table->string('name', 50);
            $table->enum('type', ['ganjil', 'genap', 'pendek']);
            $table->date('start_date');
            $table->date('end_date');
            $table->date('krs_start')->nullable();
            $table->date('krs_end')->nullable();
            $table->date('uts_start')->nullable();
            $table->date('uts_end')->nullable();
            $table->date('uas_start')->nullable();
            $table->date('uas_end')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });

        // Academic Calendar
        Schema::create('academic_calendars', function (Blueprint $table) {
            $table->id();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->date('start_date');
            $table->date('end_date');
            $table->string('type', 50);
            $table->timestamps();
        });

        // Classrooms
        Schema::create('classrooms', function (Blueprint $table) {
            $table->id();
            $table->string('code', 20)->unique();
            $table->string('name', 100);
            $table->string('building', 50)->nullable();
            $table->string('floor', 10)->nullable();
            $table->unsignedInteger('capacity')->default(40);
            $table->enum('type', ['teori', 'lab', 'ruang_ujian'])->default('teori');
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });

        // Kelas (class sections)
        Schema::create('kelas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('course_id')->constrained('courses')->cascadeOnDelete();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->string('code', 20);
            $table->string('name', 100);
            $table->unsignedInteger('capacity')->default(40);
            $table->unsignedInteger('current_enrolled')->default(0);
            $table->timestamps();
            $table->unique(['course_id', 'semester_id', 'code']);
        });

        // Schedules
        Schema::create('schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->foreignId('classroom_id')->constrained('classrooms');
            $table->enum('day', ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });

        // Exam Schedules
        Schema::create('exam_schedules', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->foreignId('classroom_id')->nullable()->constrained('classrooms')->nullOnDelete();
            $table->enum('type', ['uts', 'uas', 'quiz', 'remedial']);
            $table->date('date');
            $table->time('start_time');
            $table->time('end_time');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('exam_schedules');
        Schema::dropIfExists('schedules');
        Schema::dropIfExists('kelas');
        Schema::dropIfExists('classrooms');
        Schema::dropIfExists('academic_calendars');
        Schema::dropIfExists('semesters');
        Schema::dropIfExists('academic_years');
        Schema::dropIfExists('course_prerequisites');
        Schema::dropIfExists('courses');
    }
};
