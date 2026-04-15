<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Semester extends Model
{
    protected $fillable = [
        'academic_year_id', 'code', 'name', 'type', 'start_date', 'end_date',
        'krs_start', 'krs_end', 'uts_start', 'uts_end', 'uas_start', 'uas_end', 'is_active',
    ];

    protected function casts(): array
    {
        return [
            'is_active' => 'boolean',
            'start_date' => 'date', 'end_date' => 'date',
            'krs_start' => 'date', 'krs_end' => 'date',
            'uts_start' => 'date', 'uts_end' => 'date',
            'uas_start' => 'date', 'uas_end' => 'date',
        ];
    }

    public function academicYear(): BelongsTo { return $this->belongsTo(AcademicYear::class); }
    public function kelas(): HasMany { return $this->hasMany(Kelas::class); }
    public function calendars(): HasMany { return $this->hasMany(AcademicCalendar::class); }

    public static function active(): ?self
    {
        return static::where('is_active', true)->first();
    }
}
