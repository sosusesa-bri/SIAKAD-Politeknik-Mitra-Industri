<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Department extends Model
{
    protected $fillable = ['faculty_id', 'code', 'name', 'head_id', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }

    public function faculty(): BelongsTo { return $this->belongsTo(Faculty::class); }
    public function programStudies(): HasMany { return $this->hasMany(ProgramStudy::class); }
    public function dosen(): HasMany { return $this->hasMany(Dosen::class); }
}
