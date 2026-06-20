<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('experiences', function (Blueprint $table) {
            $table->id();
            $table->string('company');
            $table->string('position_en');
            $table->string('position_th')->nullable();
            $table->string('period', 50);
            $table->date('started_at')->nullable();
            $table->date('ended_at')->nullable();
            $table->json('description_en');
            $table->json('description_th')->nullable();
            $table->json('tech')->nullable();
            $table->unsignedTinyInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('experiences');
    }
};
