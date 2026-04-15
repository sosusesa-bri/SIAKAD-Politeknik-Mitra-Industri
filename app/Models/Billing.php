<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Billing extends Model
{
    protected $fillable = ['mahasiswa_id', 'semester_id', 'invoice_number', 'type', 'amount', 'due_date', 'status', 'description'];
    protected function casts(): array { return ['amount' => 'decimal:2', 'due_date' => 'date']; }
    public function mahasiswa(): BelongsTo { return $this->belongsTo(Mahasiswa::class); }
    public function semester(): BelongsTo { return $this->belongsTo(Semester::class); }
    public function payments(): HasMany { return $this->hasMany(Payment::class); }
}
