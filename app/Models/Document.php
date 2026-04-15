<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class Document extends Model
{
    protected $fillable = ['title', 'description', 'file_path', 'file_type', 'file_size', 'category', 'target_role', 'uploaded_by', 'download_count', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
    public function uploader(): BelongsTo { return $this->belongsTo(User::class, 'uploaded_by'); }
}
