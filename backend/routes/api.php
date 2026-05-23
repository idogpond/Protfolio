<?php

use App\Http\Controllers\Api\AdminBlogController;
use App\Http\Controllers\Api\AdminContactController;
use App\Http\Controllers\Api\AdminProfileController;
use App\Http\Controllers\Api\AdminProjectController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProfileController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/
Route::get('/health', fn () => response()->json(['status' => 'ok', 'timestamp' => now()]));

Route::get('/profile', [ProfileController::class, 'show']);

Route::apiResource('projects', ProjectController::class)->only(['index', 'show']);
Route::apiResource('blogs', BlogController::class)->only(['index'])->names(['index' => 'blogs.index']);
Route::get('/blogs/{slug}', [BlogController::class, 'show'])->name('blogs.show');
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

    // Blogs
    Route::apiResource('blogs', AdminBlogController::class)
        ->only(['index', 'show', 'store', 'update', 'destroy']);

    // Profile
    Route::get('profile',  [AdminProfileController::class, 'show']);
    Route::post('profile', [AdminProfileController::class, 'update']);

    // Contacts
    Route::get('contacts',                  [AdminContactController::class, 'index']);
    Route::patch('contacts/{contact}/read', [AdminContactController::class, 'markAsRead']);

    // Dashboard stats
    Route::get('stats', function () {
        return response()->json([
            'projects' => \App\Models\Project::count(),
            'blogs'    => \App\Models\Blog::count(),
            'contacts' => \App\Models\Contact::count(),
            'unread'   => \App\Models\Contact::unread()->count(),
        ]);
    });
});
