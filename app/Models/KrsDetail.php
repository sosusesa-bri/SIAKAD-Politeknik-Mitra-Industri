<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class KrsDetail extends Model
{
    protected $fillable = ['krs_id', 'kelas_id', 'course_id', 'sks', 'status'];
    public function krs(): BelongsTo { return $this->belongsTo(Krs::class); }
    public function kelas(): BelongsTo { return $this->belongsTo(Kelas::class); }
    public function course(): BelongsTo { return $this->belongsTo(Course::class); }
}
