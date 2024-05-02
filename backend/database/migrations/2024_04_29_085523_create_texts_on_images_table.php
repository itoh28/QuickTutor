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
        Schema::create('texts_on_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->string('text_content');
            $table->integer('font_size')->default(32);
            $table->integer('position_x');
            $table->integer('position_y');
            $table->float('text_angle')->default(0);
            $table->integer('box_width')->default(50);
            $table->integer('box_height')->default(40);
            $table->integer('text_width')->default(2);
            $table->string('font_color', 20)->default('#000000');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('texts_on_images');
    }
};
