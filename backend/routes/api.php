<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\ManualController;
use App\Http\Controllers\MediaController;
use App\Http\Controllers\UserController;

Route::get('/health', function () {
    return response()->json(['status' => 'OK'], 200);
});

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', [AuthController::class, 'getUser']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::put('/user/username', [UserController::class, 'updateUsername']);

    Route::get('/manuals', [ManualController::class, 'index']);
    Route::post('/manuals', [ManualController::class, 'store']);
    Route::get('/manuals/{id}', [ManualController::class, 'show']);
    Route::put('/manuals/{id}', [ManualController::class, 'update']);
    Route::delete('/manuals/{id}', [ManualController::class, 'destroy']);
    Route::delete('/manuals/{id}/delete', [ManualController::class, 'permanentDestroy']);

    Route::get('/trashed', [ManualController::class, 'trashed']);
    Route::post('/trashed/{id}', [ManualController::class, 'restore']);
    Route::get('/drafts', [ManualController::class, 'drafts']);

    Route::post('/media/upload', [MediaController::class, 'upload']);

    Route::get('/genres', [GenreController::class, 'index']);
    Route::delete('/genres/{id}', [GenreController::class, 'destroy']);
    Route::get('/genres/{id}/manuals', [ManualController::class, 'getManualsByGenre']);
    Route::get('/published-genres', [ManualController::class, 'getPublishedGenres']);
});
