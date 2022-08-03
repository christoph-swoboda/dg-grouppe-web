<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RequestResponseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/test', [AuthController::class, 'test']);
Route::post('send-notification', [NotificationController::class, 'send']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['auth:sanctum'],
], function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    Route::apiResource("/employees", EmployeeController::class);
    Route::get('/admin', [EmployeeController::class, 'admin']);
    Route::get('/employee', [EmployeeController::class, 'employee']);
    Route::post('/employee/profileImage/{id}', [EmployeeController::class, 'profileImage']);

    Route::apiResource("/categories", CategoryController::class);

    Route::get('/requests/published', [RequestController::class, 'publishedBills']);
    Route::get('/requests/categorized', [RequestController::class, 'categorizedBills']);
    Route::get('/request/approve/{id}', [RequestController::class, 'approve']);
    Route::post('/request/reject/{id}', [RequestController::class, 'reject']);
    Route::apiResource("/requests", RequestController::class);

    Route::post('/user/update', [UserController::class, 'update']);

    Route::apiResource("/notifications", NotificationController::class);
    Route::post('/notifications/seen/{id}', [NotificationController::class, 'seen']);

    Route::apiResource("/response", RequestResponseController::class);
});
