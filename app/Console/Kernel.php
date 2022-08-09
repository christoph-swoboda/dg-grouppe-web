<?php

namespace App\Console;

use App\Models\Bill;
use App\Models\BillCategory;
use App\Models\BillRequest;
use App\Models\Device;
use App\Models\RequestResponse;
use App\Models\User;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;
use Kutia\Larafirebase\Facades\Larafirebase;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->call(function () {
            $title = 'Hey there';
            $message = 'This is your notification';

            try {
                $devicesWithUsers = Device::whereNotNull('token')->get();
                $fcmTokens = $devicesWithUsers->pluck('token')->toArray();

                foreach ($devicesWithUsers as $User) {
                    $bill = Bill::create(['user_id' => $User->user_id]);

                    $userWithTypes = User::where('role', '!=', 1)->where('id', $User->user_id)
                        ->with(['employees' => function ($q) {
                        $q->with('types');
                    }])->get();

                    $usertypes = [];
                    foreach ($userWithTypes as $user) {
                        $employees = $user->employees;
                        foreach ($employees->types as $type) {
                            $usertypes[] = $type->id;
                        }
                    }

                    foreach ($usertypes as $userType) {
                        BillCategory::create([
                            'bill_id' => $bill->id,
                            'category_id' => $userType,
                        ]);
                    }
                    foreach ($usertypes as $type) {
                        $reqData = [
                            'bill_id' => $bill->id,
                            'category_id' => $type,
                            'user_id' =>  $user->user_id
                        ];
                        $billRequest = BillRequest::create($reqData);

                        $resData = [
                            'bill_request_id' => $billRequest->id,
                        ];
                        $response = RequestResponse::create($resData);
                    }
                }

                Larafirebase::withTitle($title)
                    ->withBody($message)
                    ->sendNotification($fcmTokens);
                return response($fcmTokens, 201);

            } catch (\Exception $e) {
                report($e);
                return response('failed', 560);
            }
        })->everyMinute();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}
