<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Krs extends Model
{
    protected $table = 'krs';
    protected $fillable = ['mahasiswa_id', 'semester_id', 'status', 'total_sks', 'is_package', 'approved_by', 'approved_at', 'notes'];
    protected function casts(): array { return ['is_package' => 'boolean', 'approved_at' => 'datetime']; }

    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }
    public function details(): HasMany { return $this->hasMany(KrsDetail::class); }
    public function approvedBy(): BelongsTo { return $this->belongsTo(Dosen::class, 'approved_by'); }
}
