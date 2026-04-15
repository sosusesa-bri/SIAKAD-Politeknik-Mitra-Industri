<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class HelpdeskReply extends Model
{
    protected $fillable = ['ticket_id', 'user_id', 'message', 'attachments'];
    protected function casts(): array { return ['attachments' => 'array']; }
    public function ticket(): BelongsTo { return $this->belongsTo(HelpdeskTicket::class, 'ticket_id'); }
    public function user(): BelongsTo { return $this->belongsTo(User::class); }
}
