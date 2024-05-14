<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EducationalProgram extends Model
{
    use HasFactory;

    public function manuals()
    {
        return $this->belongsToMany(Manual::class, 'educational_program_manuals');
    }
}
