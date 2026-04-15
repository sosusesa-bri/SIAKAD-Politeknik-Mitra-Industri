<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Classroom extends Model
{
    protected $fillable = ['code', 'name', 'building', 'floor', 'capacity', 'type', 'is_active'];
    protected function casts(): array { return ['is_active' => 'boolean']; }
}
