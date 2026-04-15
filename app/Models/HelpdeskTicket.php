<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
class HelpdeskTicket extends Model
{
    protected $fillable = ['user_id', 'ticket_number', 'subject', 'category', 'priority', 'status', 'description', 'assigned_to', 'resolved_at'];
    protected function casts(): array { return ['resolved_at' => 'datetime']; }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
    public function assignee(): BelongsTo { return $this->belongsTo(User::class, 'assigned_to'); }
    public function replies(): HasMany { return $this->hasMany(HelpdeskReply::class, 'ticket_id'); }
}
