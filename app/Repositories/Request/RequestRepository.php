<?php

namespace App\Repositories\Request;

use App\Models\Bill;
use App\Models\BillRequest;
use App\Models\User;
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
        $pendingBills = $this->getPublishedBills(auth()->user()->id);

        return ['open' => $pendingBills];
    }

    private function getPublishedBills($userId){

        return BillRequest::where('user_id', $userId)
        ->where('status', '1')
        ->orWhere('status', '3')
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

        $perPage=3;
        if(\request()->has('slug')){
            $perPage=10;
        }

        return BillRequest::where('status', $status)
                ->when(\request()->has('slug'), function ($q) use ($requestedStatus) {
                    $q->where('status', $requestedStatus);
                })
            ->with(['bill'=>function($q){
                $q->with(['user'=>function($sq){
                    $sq->with('employees');
                }])
                ->when(\request()->has('year'), function ($q) {
                    $q->whereYear('created_at', '=', \request('year'));
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


    public function categorizedBills (){

       $requests= BillRequest::where('user_id',auth()->user()->id)
            ->when(\request()->has('status'), function ($q) {
                if(\request('status')==1){
                    $q->where('status', 1)
                    ->orWhere('status', 3);
                }
                else{
                    $q->where('status', 2);
                    // ->where('created_at', '>' , now()->subMonth('4'));
                }
            })
            ->with('bill')
            ->with(['type'=>function($q){
                $q->where('title',\request('type'));
            }])
            ->with('response')
            ->paginate(8);

        return $requests;
    }

}