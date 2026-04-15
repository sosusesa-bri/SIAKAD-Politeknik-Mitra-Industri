<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Course extends Model
{
    protected $fillable = [
        'curriculum_id', 'code', 'name', 'sks_teori', 'sks_praktik',
        'semester', 'is_package', 'is_active', 'description',
    ];

    protected function casts(): array
    {
        return ['is_package' => 'boolean', 'is_active' => 'boolean'];
    }

    public function curriculum(): BelongsTo { return $this->belongsTo(Curriculum::class); }
    public function kelas(): HasMany { return $this->hasMany(Kelas::class); }

    public function prerequisites(): BelongsToMany
    {
        return $this->belongsToMany(Course::class, 'course_prerequisites', 'course_id', 'prerequisite_course_id')
                     ->withPivot('min_grade');
    }

    public function getTotalSksAttribute(): int
    {
        return $this->sks_teori + $this->sks_praktik;
    }
}
