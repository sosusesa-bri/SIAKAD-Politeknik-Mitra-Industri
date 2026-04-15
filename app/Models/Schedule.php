<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Schedule extends Model
{
    protected $fillable = ['kelas_id', 'classroom_id', 'day', 'start_time', 'end_time'];
    public function kelas(): BelongsTo { return $this->belongsTo(Kelas::class); }
    public function classroom(): BelongsTo { return $this->belongsTo(Classroom::class); }
}
