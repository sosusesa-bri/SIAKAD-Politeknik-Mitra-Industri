<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ExamSchedule extends Model
{
    protected $fillable = ['kelas_id', 'classroom_id', 'type', 'date', 'start_time', 'end_time'];
    protected function casts(): array { return ['date' => 'date']; }
    public function kelas(): BelongsTo { return $this->belongsTo(Kelas::class); }
    public function classroom(): BelongsTo { return $this->belongsTo(Classroom::class); }
}
