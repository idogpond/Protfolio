<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->string('degree_en');
            $table->string('degree_th')->nullable();
            $table->string('field_en');
            $table->string('field_th')->nullable();
            $table->string('institution');
            $table->unsignedSmallInteger('started_at')->nullable();
            $table->unsignedSmallInteger('graduated_at')->nullable();
            $table->decimal('gpa', 3, 2)->nullable();
            $table->unsignedTinyInteger('order')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('educations');
    }
};
