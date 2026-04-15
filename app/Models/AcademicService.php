<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class AcademicService extends Model
{
    protected $fillable = ['mahasiswa_id', 'type', 'title', 'description', 'status', 'tracking_code', 'submitted_at', 'reviewed_by', 'reviewed_at', 'completed_at', 'notes'];
    protected function casts(): array { return ['submitted_at' => 'datetime', 'reviewed_at' => 'datetime', 'completed_at' => 'datetime']; }
    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function documents(): HasMany { return $this->hasMany(AcademicServiceDocument::class); }
}
