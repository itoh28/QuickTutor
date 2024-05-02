<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Media extends Model
{
    use HasFactory;

    public function backgroundImage()
    {
        return $this->belongsTo(BackgroundImage::class);
    }

    public function manual()
    {
        return $this->hasOne(Manual::class);
    }

    public function step()
    {
        return $this->hasOne(Step::class);
    }

    public function textsOnImages()
    {
        return $this->hasMany(TextsOnImage::class);
    }

    public function linesOnImages()
    {
        return $this->hasMany(LinesOnImage::class);
    }

    public function arrowsOnImages()
    {
        return $this->hasMany(ArrowsOnImage::class);
    }

    public function rectanglesOnImages()
    {
        return $this->hasMany(RectanglesOnImage::class);
    }

    public function ellipsesOnImages()
    {
        return $this->hasMany(EllipsesOnImage::class);
    }
}
