<?php

namespace App\Repositories\Notifications;

use App\Models\Bill;
use App\Models\BillRequest;
use App\Models\User;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;


class NotificationRepository
{

    public function PreviousBills($user, $year, $period)
    {
        return User::where('id', $user)
            ->with(['bills' => function ($q) use ($year, $period) {
                $q->with('type');
                if ($period === '1') {
                    $q->whereMonth('created_at', '<', '5')
                        ->whereYear('created_at', '=', $year);
                } else if ($period === '2') {
                    $q->whereYear('created_at', '=', $year)
                        ->whereMonth('created_at', '>', '4')
                        ->orWhere(function ($subQ) use ($year) {
                            $subQ->whereMonth('created_at', '<', '9')
                                ->whereYear('created_at', '=', $year);
                        });
                } else if ($period === '3') {
                    $q->whereMonth('created_at', '>', '8')
                        ->whereYear('created_at', '=', $year);
                }
            }])
            ->first();
    }
}
