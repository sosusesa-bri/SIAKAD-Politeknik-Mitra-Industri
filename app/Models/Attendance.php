<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Attendance extends Model
{
    protected $fillable = ['kelas_id', 'mahasiswa_id', 'schedule_id', 'meeting_number', 'date', 'status', 'notes', 'recorded_by'];
    protected function casts(): array { return ['date' => 'date']; }
    public function kelas(): BelongsTo { return $this->belongsTo(Kelas::class); }
    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function schedule(): BelongsTo { return $this->belongsTo(Schedule::class); }
}
