<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Curriculum extends Model
{
    protected $table = 'curricula';
    protected $fillable = ['program_study_id', 'code', 'name', 'year', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean', 'year' => 'integer']; }

    public function programStudy(): BelongsTo { return $this->belongsTo(ProgramStudy::class); }
    public function courses(): HasMany { return $this->hasMany(Course::class); }
}
