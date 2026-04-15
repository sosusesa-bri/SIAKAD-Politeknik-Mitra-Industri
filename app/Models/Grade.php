<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Grade extends Model
{
    protected $fillable = [
        'mahasiswa_id', 'kelas_id', 'course_id', 'semester_id',
        'tugas', 'uts', 'uas', 'praktik', 'final_score',
        'grade_letter', 'grade_point', 'is_verified', 'verified_by', 'verified_at',
    ];

    protected function casts(): array
    {
        return [
            'is_verified' => 'boolean',
            'verified_at' => 'datetime',
            'tugas' => 'decimal:2',
            'uts' => 'decimal:2',
            'uas' => 'decimal:2',
            'praktik' => 'decimal:2',
            'final_score' => 'decimal:2',
            'grade_point' => 'decimal:2',
        ];
    }

    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function kelas(): BelongsTo { return $this->belongsTo(Kelas::class); }
    public function course(): BelongsTo { return $this->belongsTo(Course::class); }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }

    /**
     * Convert final score to grade letter.
     */
    public static function scoreToLetter(float $score): string
    {
        return match (true) {
            $score >= 85 => 'A',
            $score >= 80 => 'AB',
            $score >= 75 => 'B',
            $score >= 70 => 'BC',
            $score >= 60 => 'C',
            $score >= 50 => 'D',
            default => 'E',
        };
    }

    /**
     * Convert grade letter to grade point.
     */
    public static function letterToPoint(string $letter): float
    {
        return match ($letter) {
            'A' => 4.00,
            'AB' => 3.50,
            'B' => 3.00,
            'BC' => 2.50,
            'C' => 2.00,
            'D' => 1.00,
            'E' => 0.00,
            default => 0.00,
        };
    }
}
