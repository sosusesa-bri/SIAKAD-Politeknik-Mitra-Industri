<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Evaluations (EDOM forms)
        Schema::create('evaluations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('semester_id')->constrained('semesters')->cascadeOnDelete();
            $table->foreignId('kelas_id')->constrained('kelas')->cascadeOnDelete();
            $table->unsignedBigInteger('dosen_id');
            $table->foreign('dosen_id')->references('id')->on('dosen')->cascadeOnDelete();
            $table->string('title');
            $table->boolean('is_active')->default(true);
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });

        // Evaluation Questions
        Schema::create('evaluation_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluation_id')->constrained('evaluations')->cascadeOnDelete();
            $table->text('question');
            $table->enum('type', ['scale', 'text', 'choice']);
            $table->unsignedInteger('order')->default(0);
            $table->json('options')->nullable();
            $table->timestamps();
        });

        // Evaluation Responses (ANONYMOUS — hashed token, no direct user link)
        Schema::create('evaluation_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluation_id')->constrained('evaluations')->cascadeOnDelete();
            $table->foreignId('question_id')->constrained('evaluation_questions')->cascadeOnDelete();
            $table->string('respondent_token', 64)->comment('Hashed anonymous token');
            $table->text('response_value');
            $table->timestamps();
            $table->index('respondent_token');
        });

        // Evaluation Completions (separate — tracks who completed, NOT linked to responses)
        Schema::create('evaluation_completions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('evaluation_id')->constrained('evaluations')->cascadeOnDelete();
            $table->unsignedBigInteger('mahasiswa_id');
            $table->foreign('mahasiswa_id')->references('id')->on('mahasiswa')->cascadeOnDelete();
            $table->timestamp('completed_at');
            $table->unique(['evaluation_id', 'mahasiswa_id']);
        });

        // Surveys
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->nullable();
            $table->foreignId('semester_id')->nullable()->constrained('semesters')->nullOnDelete();
            $table->enum('target_role', ['mahasiswa', 'dosen', 'all'])->default('all');
            $table->boolean('is_active')->default(true);
            $table->date('start_date');
            $table->date('end_date');
            $table->timestamps();
        });

        // Survey Questions
        Schema::create('survey_questions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('surveys')->cascadeOnDelete();
            $table->text('question');
            $table->enum('type', ['scale', 'text', 'choice', 'multiple_choice']);
            $table->unsignedInteger('order')->default(0);
            $table->json('options')->nullable();
            $table->timestamps();
        });

        // Survey Responses (ANONYMOUS)
        Schema::create('survey_responses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('survey_id')->constrained('surveys')->cascadeOnDelete();
            $table->foreignId('question_id')->constrained('survey_questions')->cascadeOnDelete();
            $table->string('respondent_token', 64);
            $table->text('response_value');
            $table->timestamps();
            $table->index('respondent_token');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('survey_responses');
        Schema::dropIfExists('survey_questions');
        Schema::dropIfExists('surveys');
        Schema::dropIfExists('evaluation_completions');
        Schema::dropIfExists('evaluation_responses');
        Schema::dropIfExists('evaluation_questions');
        Schema::dropIfExists('evaluations');
    }
};
