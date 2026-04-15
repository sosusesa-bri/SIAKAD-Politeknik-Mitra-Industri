<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class AcademicServiceDocument extends Model
{
    protected $fillable = ['academic_service_id', 'file_name', 'file_path', 'file_type', 'file_size', 'uploaded_at'];
    protected function casts(): array { return ['uploaded_at' => 'datetime']; }
    public function service(): BelongsTo { return $this->belongsTo(AcademicService::class, 'academic_service_id'); }
}
