<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Manual extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $fillable = ['media_id', 'manual_title', 'is_draft'];


    public function users()
    {
        return $this->belongsToMany(User::class, 'user_manuals')
            ->withTimestamps()
            ->withPivot('updated_at');
    }

    public function question()
    {
        return $this->hasOne(Question::class);
    }

    public function genres()
    {
        return $this->belongsToMany(Genre::class, 'genre_manuals');
    }

    public function educationalPrograms()
    {
        return $this->belongsToMany(EducationalProgram::class, 'educational_program_manuals');
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
