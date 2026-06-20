<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::table('blogs', function (Blueprint $table) {
            $table->string('title_th')->nullable()->after('title');
            $table->text('excerpt_th')->nullable()->after('excerpt');
            $table->longText('content_th')->nullable()->after('content');
        });
    }

    public function down(): void {
        Schema::table('blogs', function (Blueprint $table) {
            $table->dropColumn(['title_th', 'excerpt_th', 'content_th']);
        });
    }
};
