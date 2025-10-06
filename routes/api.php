<?php

use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\RequestController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\RequestResponseController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\UnresolvedUserController;
use App\Models\Bill;
use App\Models\BillRequest;
use App\Models\Category;
use App\Models\Notification;
use App\Models\RequestResponse;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('/login', [AuthController::class, 'login']);
Route::get('/test', [AuthController::class, 'test']);
Route::get('/send-notification', [NotificationController::class, 'sendNotification']);
Route::apiResource("/settings", SettingController::class);

//Route::get('/create-bills-for-test-users', function () {
//    $userEmails = ['bensurname@example.com', 'shakil@test.com'];
//
//    $categories = Category::all();
//
//    foreach ($userEmails as $email) {
//        $user = User::where('email', $email)->first();
//
//        if (!$user) {
//            echo "❌ User with email {$email} not found.<br>";
//            continue;
//        }
//
//        foreach ($categories as $category) {
//            $bill = Bill::create([
//                'user_id' => $user->id,
//                'title' => 'Rechnung Zum Hochladen',
//                'description' => 'Aliquam repellendus eius animi vel mollitia molestiae alias. Nam maxime itaque minima ut quaerat iste maxime. Quis et numquam ut provident magni odit.',
//            ]);
//
//            $bill->type()->attach($category->id);
//
//            $billRequest = BillRequest::create([
//                'bill_id' => $bill->id,
//                'category_id' => $category->id,
//                'user_id' => $user->id,
//                'published' => 1
//            ]);
//
//            Notification::create([
//                'user_id' => $user->id,
//                'bill_request_id' => $billRequest->id,
//            ]);
//
//            RequestResponse::create([
//                'bill_request_id' => $billRequest->id,
//                'message' => 'Test Request',
//                'image' => 'no-image.png',
//            ]);
//        }
//
//        echo "✅ Bills and notifications created successfully for {$user->email}.<br>";
//    }
//
//    return 'Process completed.';
//});


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
    Route::post('/employees/bulk', [EmployeeController::class, 'addBulk']);
    Route::post('/save-device-id/{token}', [EmployeeController::class, 'saveDeviceId']);
    Route::post('/employee/profileImage/{id}', [EmployeeController::class, 'profileImage']);

    Route::apiResource("/categories", CategoryController::class);

    Route::apiResource("/unresolved-users", UnresolvedUserController::class);


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
