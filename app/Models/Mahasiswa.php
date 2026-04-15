<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Mahasiswa extends Model
{
    protected $table = 'mahasiswa';

    protected $fillable = [
        'user_id', 'nim', 'name', 'program_study_id', 'curriculum_id',
        'class_year', 'semester_active', 'academic_status', 'dosen_wali_id',
        'birth_place', 'birth_date', 'gender', 'address', 'phone',
        'parent_name', 'parent_phone', 'entry_date', 'max_sks',
        'ipk', 'total_sks_passed', 'photo',
    ];

    protected function casts(): array
    {
        return [
            'birth_date' => 'date',
            'entry_date' => 'date',
            'ipk' => 'decimal:2',
            'class_year' => 'integer',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function programStudy(): BelongsTo
    {
        return $this->belongsTo(ProgramStudy::class);
    }

    public function curriculum(): BelongsTo
    {
        return $this->belongsTo(Curriculum::class);
    }

    public function dosenWali(): BelongsTo
    {
        return $this->belongsTo(Dosen::class, 'dosen_wali_id');
    }

    public function krs(): HasMany
    {
        return $this->hasMany(Krs::class);
    }

    public function grades(): HasMany
    {
        return $this->hasMany(Grade::class);
    }

    public function attendances(): HasMany
    {
        return $this->hasMany(Attendance::class);
    }

    public function registrations(): HasMany
    {
        return $this->hasMany(Registration::class);
    }

    public function billings(): HasMany
    {
        return $this->hasMany(Billing::class);
    }

    public function academicServices(): HasMany
    {
        return $this->hasMany(AcademicService::class);
    }

    /**
     * Calculate IPS (Index Prestasi Semester) for a given semester.
     */
    public function calculateIps(int $semesterId): float
    {
        $grades = $this->grades()
            ->where('semester_id', $semesterId)
            ->whereNotNull('grade_point')
            ->get();

        if ($grades->isEmpty()) {
            return 0.0;
        }

        $totalPoints = 0;
        $totalSks = 0;

        foreach ($grades as $grade) {
            $sks = $grade->course->sks_teori + $grade->course->sks_praktik;
            $totalPoints += $grade->grade_point * $sks;
            $totalSks += $sks;
        }

        return $totalSks > 0 ? round($totalPoints / $totalSks, 2) : 0.0;
    }
}
