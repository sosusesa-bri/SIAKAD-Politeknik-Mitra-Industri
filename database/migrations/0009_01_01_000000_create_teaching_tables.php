<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Guidances
        Schema::create('guidances', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->enum('type', ['paper', 'skripsi', 'lomba', 'teaching_factory', 'akademik']);
            $table->string('title')->nullable();
            $table->enum('status', ['active', 'completed', 'cancelled'])->default('active');
            $table->timestamps();
        });

        // Guidance Sessions
        Schema::create('guidance_sessions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('guidance_id')->constrained('guidances')->cascadeOnDelete();
            $table->timestamp('scheduled_at');
            $table->string('location')->nullable();
            $table->text('notes')->nullable();
            $table->enum('status', ['scheduled', 'completed', 'cancelled'])->default('scheduled');
            $table->timestamps();
        });

        // Course Materials
        Schema::create('course_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->string('file_type', 50)->nullable();
            $table->tinyInteger('meeting_number')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Assignments
        Schema::create('assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->string('title');
            $table->text('description')->nullable();
            $table->timestamp('due_date');
            $table->decimal('max_score', 5, 2)->default(100);
            $table->string('file_path')->nullable();
            $table->boolean('is_published')->default(true);
            $table->timestamps();
        });

        // Assignment Submissions
        Schema::create('assignment_submissions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('assignment_id')->constrained('assignments')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->string('file_path');
            $table->timestamp('submitted_at');
            $table->decimal('score', 5, 2)->nullable();
            $table->unsignedBigInteger('graded_by')->nullable();
            $table->foreign('graded_by')->references('id')->on('dosen')->nullOnDelete();
            $table->timestamp('graded_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
            $table->unique(['assignment_id', 'mahasiswa_id']);
        });

        // Teaching Reports (Berita Acara)
        Schema::create('teaching_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->tinyInteger('meeting_number');
            $table->date('date');
            $table->string('topic');
            $table->text('description')->nullable();
            $table->string('file_path')->nullable();
            $table->timestamps();
        });

        // Class Forums
        Schema::create('class_forums', function (Blueprint $table) {
            $table->id();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->string('title');
            $table->foreignId('created_by')->constrained('users')->cascadeOnDelete();
            $table->boolean('is_locked')->default(false);
            $table->timestamps();
        });

        // Class Forum Posts
        Schema::create('class_forum_posts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('forum_id')->constrained('class_forums')->cascadeOnDelete();
            $table->foreignId('user_id')->constrained('users')->cascadeOnDelete();
            $table->text('content');
            $table->foreignId('parent_id')->nullable()->constrained('class_forum_posts')->nullOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('class_forum_posts');
        Schema::dropIfExists('class_forums');
        Schema::dropIfExists('teaching_reports');
        Schema::dropIfExists('assignment_submissions');
        Schema::dropIfExists('assignments');
        Schema::dropIfExists('course_materials');
        Schema::dropIfExists('guidance_sessions');
        Schema::dropIfExists('guidances');
    }
};
