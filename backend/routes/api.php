<?php

use App\Http\Controllers\Api\AdminContactController;
use App\Http\Controllers\Api\AdminEducationController;
use App\Http\Controllers\Api\AdminExperienceController;
use App\Http\Controllers\Api\AdminProfileController;
use App\Http\Controllers\Api\AdminProjectController;
use App\Http\Controllers\Api\AdminSkillController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\EducationController;
use App\Http\Controllers\Api\ExperienceController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\SkillController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/health', fn () => response()->json(['status' => 'ok', 'timestamp' => now()]));

Route::get('/profile',     [ProfileController::class,    'show']);
Route::get('/experiences', [ExperienceController::class, 'index']);
Route::get('/skills',      [SkillController::class,      'index']);
Route::get('/educations',  [EducationController::class,  'index']);

Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::post('/contacts', [ContactController::class, 'store']);

/*
|--------------------------------------------------------------------------
| Auth Routes (Public)
|--------------------------------------------------------------------------
*/
Route::prefix('auth')->group(function () {
    Route::post('/login', [AuthController::class, 'login']);

    Route::middleware('auth:sanctum')->group(function () {
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::get('/me',     [AuthController::class, 'me']);
    });
});

/*
|--------------------------------------------------------------------------
| Admin Routes (Protected by Sanctum)
|--------------------------------------------------------------------------
*/
Route::prefix('admin')->middleware('auth:sanctum')->group(function () {
    // Projects
    Route::apiResource('projects', AdminProjectController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    // Profile
    Route::get('profile',  [AdminProfileController::class, 'show']);
    Route::post('profile', [AdminProfileController::class, 'update']);

    // Experiences / Skills / Educations
    Route::apiResource('experiences', AdminExperienceController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::apiResource('skills', AdminSkillController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);
    Route::apiResource('educations', AdminEducationController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    // Contacts
    Route::get('contacts',                  [AdminContactController::class, 'index']);
    Route::patch('contacts/{contact}/read', [AdminContactController::class, 'markAsRead']);

    // Dashboard stats
    Route::get('stats', function () {
        return response()->json([
            'projects' => \App\Models\Project::count(),
            'contacts' => \App\Models\Contact::count(),
            'unread'   => \App\Models\Contact::unread()->count(),
        ]);
    });
});
