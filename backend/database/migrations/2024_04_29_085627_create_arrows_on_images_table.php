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
        Schema::create('arrows_on_images', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('start_point_x');
            $table->integer('start_point_y');
            $table->integer('end_point_x');
            $table->integer('end_point_y');
            $table->float('arrow_angle')->default(0);
            $table->integer('arrowhead_width')->default(10);
            $table->integer('arrowhead_length')->default(15);
            $table->integer('arrowline_width')->default(5);
            $table->string('arrow_color', 20)->default('#000000');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('arrows_on_images');
    }
};
