<?php

use App\Http\Controllers\Admin\CategoryController;
use App\Http\Controllers\Admin\DiscountController;
use App\Http\Controllers\Admin\OrderController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FrontEndController;
use App\Http\Controllers\InventoryController;
use App\Http\Controllers\NotificationController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/products/{category}/{query}', [FrontEndController::class, 'show']);

Route::get('/getCategory', [CategoryController::class, 'index']);
Route::get('/getAllCategory', [CategoryController::class, 'allCategories']);

Route::get('/tables', [OrderController::class, 'tables']);
Route::get('/latestOrder', [OrderController::class, 'latestOrder']);

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => ['auth:sanctum']
], function () {

    Route::post('/mailNotification/{info}', [NotificationController::class, 'sendNotification']);
    Route::get('/notification', [FrontEndController::class, 'sendNotification']);

    Route::get('/getUsers', [UserController::class, 'show']);
    Route::post('/updateUser/{id}/{role}', [UserController::class, 'update']);

    Route::get('/productsWithInventory', [InventoryController::class, 'index']);
    Route::get('/inventories', [InventoryController::class, 'show']);

    Route::get('/getOrderInfo/{statusFilter}/{customerFilter}', [OrderController::class, 'index']);
    Route::post('/updateOrder/{id}', [OrderController::class, 'update']);
    Route::post('/storeOrder', [OrderController::class, 'store']);
    Route::get('/getMostOrdered/{filter}', [OrderController::class, 'mostOrdered']);
    Route::get('/businessSummery', [OrderController::class, 'businessSummery']);

    Route::get('/getDiscounts', [DiscountController::class, 'show']);
    Route::post('/storeDiscount', [DiscountController::class, 'store']);
    Route::post('/updateDiscount/{id}', [DiscountController::class, 'update']);
    Route::delete('/deleteDiscount/{id}', [DiscountController::class, 'destroy']);

    Route::post('/store', [FrontEndController::class, 'store']);
    Route::post('/update/{id}', [FrontEndController::class, 'update']);
    Route::delete('/delete/{id}', [FrontEndController::class, 'destroy']);

    Route::post('/createCategory', [CategoryController::class, 'store']);
    Route::post('/updateCategory/{id}', [CategoryController::class, 'update']);
    Route::delete('/deleteCategory/{id}', [CategoryController::class, 'destroy']);
});
