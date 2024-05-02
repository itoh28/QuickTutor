<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // ユニークインデックスが存在するかどうかをチェック
        $indexExists = DB::table('information_schema.statistics')
            ->where('table_schema', DB::connection()->getDatabaseName())
            ->where('table_name', 'users')
            ->where('index_name', 'users_email_unique')
            ->exists();

        Schema::table('users', function (Blueprint $table) use ($indexExists) {
            // ユニークインデックスが存在する場合は削除
            if ($indexExists) {
                $table->dropUnique('users_email_unique');
            }

            // emailカラムの変更
            $table->string('email')->nullable()->unique()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('email')->unique()->nullable(false)->change();
        });
    }
};
