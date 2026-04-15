<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicYear extends Model
{
    protected $fillable = ['code', 'name', 'start_date', 'end_date', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean', 'start_date' => 'date', 'end_date' => 'date']; }
    public function semesters(): HasMany { return $this->hasMany(Semester::class); }
}
