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
        Schema::table('user_questions', function (Blueprint $table) {
            if (!Schema::hasColumn('user_questions', 'created_at')) {
                $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->after('manual_id');
            } else {
                $table->dateTime('created_at')->default(DB::raw('CURRENT_TIMESTAMP'))->change();
            }

            if (!Schema::hasColumn('user_questions', 'updated_at')) {
                $table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->after('created_at');
            } else {
                $table->dateTime('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'))->change();
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('user_questions', function (Blueprint $table) {
            $table->dateTime('created_at')->default(null)->change();
            $table->dateTime('updated_at')->default(null)->change();
        });
    }
};
