<?php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('profiles', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('nickname', 100)->nullable();
            $table->string('job_title_en');
            $table->string('job_title_th')->nullable();
            $table->text('bio_en');
            $table->text('bio_th')->nullable();
            $table->longText('about_en')->nullable();
            $table->longText('about_th')->nullable();
            $table->string('profile_image', 500)->nullable();
            $table->unsignedTinyInteger('years_of_experience')->default(0);
            $table->date('date_of_birth')->nullable();
            $table->string('location_en')->nullable();
            $table->string('location_th')->nullable();
            $table->boolean('available_for_hire')->default(true);
            $table->string('email')->nullable();
            $table->string('phone', 50)->nullable();
            $table->string('line_id', 100)->nullable();
            $table->string('whatsapp', 50)->nullable();
            $table->string('github_url', 500)->nullable();
            $table->string('linkedin_url', 500)->nullable();
            $table->string('facebook_url', 500)->nullable();
            $table->string('twitter_url', 500)->nullable();
            $table->string('instagram_url', 500)->nullable();
            $table->string('youtube_url', 500)->nullable();
            $table->string('website_url', 500)->nullable();
            $table->string('resume_url', 500)->nullable();
            $table->string('resume_label_en', 100)->nullable();
            $table->string('resume_label_th', 100)->nullable();
            $table->string('meta_title_en')->nullable();
            $table->string('meta_title_th')->nullable();
            $table->string('meta_description_en', 500)->nullable();
            $table->string('meta_description_th', 500)->nullable();
            $table->string('og_image', 500)->nullable();
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('profiles');
    }
};
