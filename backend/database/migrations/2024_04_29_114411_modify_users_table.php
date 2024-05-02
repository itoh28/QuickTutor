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
        Schema::table('users', function (Blueprint $table) {
            $table->foreignId('group_id')->after('id')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->foreignId('role_id')->after('password')->constrained()->onUpdate('cascade')->onDelete('cascade');
            $table->renameColumn('name', 'username');
            $table->dateTime('created_at')->change();
            $table->dateTime('updated_at')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('group_id');
            $table->dropForeign('role_id');
            $table->dropColumn('group_id');
            $table->dropColumn('role_id');
            $table->renameColumn('username', 'name');
            $table->timestamp('created_at')->change();
            $table->timestamp('updated_at')->change();
        });
    }
};
