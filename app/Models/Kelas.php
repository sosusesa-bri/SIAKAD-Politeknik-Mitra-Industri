<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Kelas extends Model
{
    protected $table = 'kelas';
    protected $fillable = ['course_id', 'semester_id', 'dosen_id', 'code', 'name', 'capacity', 'current_enrolled'];

    public function course(): BelongsTo { return $this->belongsTo(Course::class); }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }
    public function dosen(): BelongsTo { return $this->belongsTo(Dosen::class); }
    public function schedules(): HasMany { return $this->hasMany(Schedule::class); }
    public function examSchedules(): HasMany { return $this->hasMany(ExamSchedule::class); }
    public function krsDetails(): HasMany { return $this->hasMany(KrsDetail::class); }
    public function grades(): HasMany { return $this->hasMany(Grade::class); }
    public function attendances(): HasMany { return $this->hasMany(Attendance::class); }
    public function materials(): HasMany { return $this->hasMany(CourseMaterial::class); }
    public function assignments(): HasMany { return $this->hasMany(Assignment::class); }
}
