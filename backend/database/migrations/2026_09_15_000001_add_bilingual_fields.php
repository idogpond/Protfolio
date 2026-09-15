<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('name_en')->nullable()->after('name');
            $table->string('name_th')->nullable()->after('name_en');
            $table->string('nickname_en', 100)->nullable()->after('nickname');
            $table->string('nickname_th', 100)->nullable()->after('nickname_en');
        });
        DB::statement('UPDATE profiles SET name_en = name, nickname_en = nickname');
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['name', 'nickname']);
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->string('period_en', 50)->nullable()->after('period');
            $table->string('period_th', 50)->nullable()->after('period_en');
        });
        DB::statement('UPDATE experiences SET period_en = period');
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn('period');
        });

        Schema::table('educations', function (Blueprint $table) {
            $table->string('institution_en')->nullable()->after('institution');
            $table->string('institution_th')->nullable()->after('institution_en');
        });
        DB::statement('UPDATE educations SET institution_en = institution');
        Schema::table('educations', function (Blueprint $table) {
            $table->dropColumn('institution');
        });
    }

    public function down(): void
    {
        Schema::table('profiles', function (Blueprint $table) {
            $table->string('name')->nullable()->after('id');
            $table->string('nickname', 100)->nullable()->after('name');
        });
        DB::statement('UPDATE profiles SET name = name_en, nickname = nickname_en');
        Schema::table('profiles', function (Blueprint $table) {
            $table->dropColumn(['name_en', 'name_th', 'nickname_en', 'nickname_th']);
        });

        Schema::table('experiences', function (Blueprint $table) {
            $table->string('period', 50)->nullable()->after('company');
        });
        DB::statement('UPDATE experiences SET period = period_en');
        Schema::table('experiences', function (Blueprint $table) {
            $table->dropColumn(['period_en', 'period_th']);
        });

        Schema::table('educations', function (Blueprint $table) {
            $table->string('institution')->nullable()->after('field_th');
        });
        DB::statement('UPDATE educations SET institution = institution_en');
        Schema::table('educations', function (Blueprint $table) {
            $table->dropColumn(['institution_en', 'institution_th']);
        });
    }
};
