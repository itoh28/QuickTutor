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
        Schema::create('step_manuals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('step_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('manual_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('step_manuals');
    }
};
