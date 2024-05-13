<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Step extends Model
{
    use HasFactory;

    protected $fillable = ['step_subtitle', 'step_comment'];

    public function manual()
    {
        return $this->belongsTo(Manual::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }
}
