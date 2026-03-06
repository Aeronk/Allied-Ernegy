<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('subtitle');
            $table->string('image_url')->nullable();
            $table->string('image_path')->nullable();
            $table->string('cta_primary_text')->default('Learn More');
            $table->string('cta_primary_url')->default('/offer');
            $table->string('cta_secondary_text')->default('Explore Projects');
            $table->string('cta_secondary_url')->default('/projects');
            $table->integer('order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
