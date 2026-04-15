<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class AcademicCalendar extends Model
{
    protected $fillable = ['semester_id', 'title', 'description', 'start_date', 'end_date', 'type'];
    protected function casts(): array { return ['start_date' => 'date', 'end_date' => 'date']; }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }
}
