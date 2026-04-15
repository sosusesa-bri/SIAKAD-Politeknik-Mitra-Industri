<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // TeFa Projects
        Schema::create('tefa_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->unsignedBigInteger('supervisor_id');
            $table->foreign('supervisor_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->enum('status', ['proposed', 'active', 'completed', 'cancelled'])->default('proposed');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        // TeFa Project Members
        Schema::create('tefa_project_members', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('tefa_projects')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->string('role', 50)->default('member');
            $table->timestamps();
            $table->unique(['project_id', 'mahasiswa_id']);
        });

        // TeFa Proposals
        Schema::create('tefa_proposals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->nullable()->constrained('tefa_projects')->nullOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->string('title');
            $table->string('file_path');
            $table->enum('status', ['submitted', 'reviewed', 'approved', 'rejected'])->default('submitted');
            $table->unsignedBigInteger('reviewed_by')->nullable();
            $table->foreign('reviewed_by')->references('id')->on('dosen')->nullOnDelete();
            $table->timestamp('reviewed_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // TeFa Logbooks
        Schema::create('tefa_logbooks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('tefa_projects')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->date('date');
            $table->text('activity');
            $table->tinyInteger('progress_percentage')->default(0);
            $table->enum('status', ['submitted', 'validated', 'revision'])->default('submitted');
            $table->unsignedBigInteger('validated_by')->nullable();
            $table->foreign('validated_by')->references('id')->on('dosen')->nullOnDelete();
            $table->timestamp('validated_at')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });

        // TeFa Reports
        Schema::create('tefa_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_id')->constrained('tefa_projects')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->string('title');
            $table->string('file_path');
            $table->enum('type', ['progress', 'final'])->default('progress');
            $table->timestamp('submitted_at');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tefa_reports');
        Schema::dropIfExists('tefa_logbooks');
        Schema::dropIfExists('tefa_proposals');
        Schema::dropIfExists('tefa_project_members');
        Schema::dropIfExists('tefa_projects');
    }
};
