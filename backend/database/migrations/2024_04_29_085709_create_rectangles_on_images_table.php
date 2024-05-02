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
        Schema::create('rectangles_on_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('position_x');
            $table->integer('position_y');
            $table->float('rectangle_angle')->default(0);
            $table->integer('rectangle_width');
            $table->integer('rectangle_height');
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
        Schema::dropIfExists('rectangles_on_images');
    }
};
