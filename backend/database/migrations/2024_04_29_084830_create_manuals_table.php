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
        Schema::create('manuals', function (Blueprint $table) {
            $table->id();
            $table->foreignId('media_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->integer('view_count')->default(0);
            $table->foreignId('step_id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->boolean('is_draft')->default('1');
            $table->dateTime('deleted_at')->nullable();
            $table->dateTime('created_at');
            $table->dateTime('updated_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('manuals');
    }
};
