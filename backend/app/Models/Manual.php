<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Manual extends Model
{
    use HasFactory;

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function question()
    {
        return $this->hasOne(Question::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class);
    }

    public function educationalPrograms()
    {
        return $this->belongsToMany(EducationalProgram::class);
    }

    public function media()
    {
        return $this->belongsTo(Media::class);
    }

    public function steps()
    {
        return $this->hasMany(Step::class);
    }
}
