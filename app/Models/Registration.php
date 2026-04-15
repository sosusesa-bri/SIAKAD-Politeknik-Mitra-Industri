<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Registration extends Model
{
    protected $fillable = ['mahasiswa_id', 'semester_id', 'status', 'registered_at', 'verified_at', 'verified_by', 'notes'];
    protected function casts(): array { return ['registered_at' => 'datetime', 'verified_at' => 'datetime']; }
    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }
}
