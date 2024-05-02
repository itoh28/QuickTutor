<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('ellipses_on_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('center_x');
            $table->integer('center_y');
            $table->integer('radius_x');
            $table->integer('radius_y');
            $table->float('ellipse_angle')->default(0);
            $table->integer('stroke_width')->default(5);
            $table->string('stroke_color', 20)->default('#000000');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ellipses_on_images');
    }
};
