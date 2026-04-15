<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Payment extends Model
{
    protected $fillable = ['billing_id', 'transaction_code', 'amount', 'payment_date', 'payment_method', 'proof_file', 'status', 'verified_by', 'verified_at', 'notes'];
    protected function casts(): array { return ['amount' => 'decimal:2', 'payment_date' => 'date', 'verified_at' => 'datetime']; }
    public function billing(): BelongsTo { return $this->belongsTo(Billing::class); }
    public function receipt(): HasOne { return $this->hasOne(Receipt::class); }
}
