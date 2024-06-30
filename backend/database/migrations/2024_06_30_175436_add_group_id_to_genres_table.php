<?php

// database/migrations/xxxx_xx_xx_xxxxxx_add_group_id_to_genres_table.php

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
        Schema::table('genres', function (Blueprint $table) {
            $table->foreignId('group_id')->constrained()->onUpdate('cascade')->onDelete('cascade')->after('genre_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('genres', function (Blueprint $table) {
            $table->dropForeign(['group_id']);
            $table->dropColumn('group_id');
        });
    }
};
