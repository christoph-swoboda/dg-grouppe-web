<?php

namespace App\Repositories\Request;

use App\Models\Bill;
use App\Models\BillRequest;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;


class RequestRepository
{

    private $model;

    public function __construct(Bill $bill)
    {
        $this->model = $bill;
    }

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function Bills(): array
    {
        $pendingBills = $this->getBills('1');
        $approvedBills = $this->getBills('2');
        $rejectedBills = $this->getBills('3');

        return ['open' => $pendingBills, 'approved' => $approvedBills, 'rejected' => $rejectedBills];
    }

    /**
     * Display a listing of the resource.
     *
     * @return array
     */
    public function publishedBills(): array
    {
        $pendingBills = $this->getPublishedBills();

        return ['open' => $pendingBills];
    }

    private function getPublishedBills()
    {
        return BillRequest::where('status', '!=', '2')
            ->where('published', 1)
            ->where('user_id', auth()->user()->id)
            ->with(['bill' => function ($q) {
                $q->with('type:id,title');
                // ->with(['user'=>function($sq){
                //     $sq->with('employees');
                // }]);
            }])
            ->with('type')
            ->with('response')
            ->orderBy('id', 'desc')
            ->paginate(5);
    }

    private function getBills($status): \Illuminate\Contracts\Pagination\LengthAwarePaginator
    {
        $requestedStatus = 0;
        if (\request('slug') == 'pending') {
            $requestedStatus = '1';
        } else if (\request('slug') == 'confirmed') {
            $requestedStatus = '2';
        } else {
            $requestedStatus = '3';
        }

        $perPage = 3;
        if (\request()->has('slug')) {
            $perPage = 10;
        }

        return BillRequest::where('status', $status)
            ->when(\request()->has('slug'), function ($q) use ($requestedStatus) {
                $q->where('status', $requestedStatus);
            })
            ->with(['bill' => function ($q) {
                $q->with(['user' => function ($sq) {
                    $sq->with('employees');
                }])
                    ->when(\request()->has('year'), function ($q) {
                        if(\request('year')==='1970'){
                            $q->whereYear('created_at', '>', '1970');
                        }
                        else{
                            $q->whereYear('created_at', '=', \request('year'));
                        }
                    })
                    ->when(\request()->has('period'), function ($q) {
                        if (\request('period') == 1) {
                            $q->whereMonth('created_at', '<', '5');
                        } else if (\request('period') == 2) {
                            $q->where(function ($query) {
                                $query->whereMonth('created_at', 5);
                                $query->orWhere(function ($query2) {
                                    $query2->whereMonth('created_at', 6);
                                });
                                $query->orWhere(function ($query1) {
                                    $query1->whereMonth('created_at', 7);
                                });
                                $query->orWhere(function ($query1) {
                                    $query1->whereMonth('created_at', 8);
                                });
                            });
                        } else {
                            $q->whereMonth('created_at', '>', '8');
                        }
                    });
            }])
            ->with('type')
            ->with('response')
            ->orderBy('id', 'desc')
            ->paginate($perPage);
    }


    public function categorizedBills()
    {

        return BillRequest::where('user_id', auth()->user()->id)
            ->when(\request()->has('status'), function ($q) {
                if (\request('status') == 1) {
                    $q->where('status', '!=', '2');
                } else {
                    $q->where('status', 2);
                    // ->where('created_at', '>' , now()->subMonth('4'));
                }
            })
            ->with('bill')
            ->with(['type' => function ($q) {
                $q->where('title', \request('type'));
            }])
            ->with('response')
            ->paginate(8);
    }

}
