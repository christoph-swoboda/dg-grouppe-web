<?php

namespace App\Http\Controllers;

use App\Models\Bill;
use App\Models\BillCategory;
use App\Models\BillRequest;
use App\Models\Category;
use App\Models\Device;
use App\Models\Notification;
use App\Models\RequestResponse;
use App\Repositories\Notifications\NotificationRepository;
use App\Repositories\Request\RequestRepository;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Kutia\Larafirebase\Facades\Larafirebase;

class RequestController extends Controller
{

    public $requestRepository;
    public $notificationsRepository;

    public function __construct(RequestRepository $requestRepository, NotificationRepository $notificationRepository)
    {
        $this->requestRepository = $requestRepository;
        $this->notificationsRepository = $notificationRepository;
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function index(): Response
    {
        $result = $this->requestRepository->Bills();

        return response($result, 201);
    }

    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function publishedBills(): Response
    {
        $result = $this->requestRepository->publishedBills();

        return response($result, 201);
    }


    /**
     * Display a listing of the resource.
     *
     * @return Response
     */
    public function categorizedBills(): Response
    {
        $result = $this->requestRepository->categorizedBills();

        return response($result, 201);
    }


    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return Response
     */
    public function store(Request $request): Response
    {
        $year = Carbon::now()->year;
        $month = Carbon::now()->month;
        $period = $request->input('period');
        $created_at = Carbon::now();

        if ($request->input('year')) {
            $yearInput = new Carbon($request->input('year'));
            $year = $yearInput->addYear()->toDate()->format('Y');
        }
        if ($request->input('period') == '0') {
            if ($month <= 4) {
                $period = '1';
            } else if ($month >= 5 && $month <= 8) {
                $period = '2';
            } else {
                $period = '3';
            }
        } else {
            if ($period == '1') {
                $created_at = Carbon::parse($year . '-' . '1' . '-1');
            } else if ($period == '2') {
                $created_at = Carbon::parse($year . '-' . '5' . '-1');
            } else {
                $created_at = Carbon::parse($year . '-' . '9' . '-1');
            }
        }

        $previousBills = $this->notificationsRepository->PreviousBills($request->input('user'), $year, $period);
        $fcmToken = Device::whereNotNull('token')->where('user_id', $request->input('user'))->pluck('token')->toArray();

        $billTypes = [];
        foreach ($previousBills->bills as $bill) {
            foreach ($bill->type as $type) {
                $billTypes[] = $type->id;
            }
        }
        $newTypeTobeSaved = [];
        foreach ($request->input('types') as $type) {
            if (!in_array($type, $billTypes)) {
                $newTypeTobeSaved[] = $type;
            }
        }

        $billData = [
            'user_id' => $request->input('user'),
            'created_at' => $created_at,
        ];

        if (count($previousBills->bills) === 0 && !empty($newTypeTobeSaved)) {
            $bill = Bill::create($billData);

            foreach ($newTypeTobeSaved as $newType) {
                BillCategory::create([
                    'bill_id' => $bill->id,
                    'category_id' => $newType,
                ]);
                $reqData = [
                    'bill_id' => $bill->id,
                    'category_id' => $newType,
                    'user_id' => $request->input('user')
                ];
                $billRequest = BillRequest::create($reqData);

                $resData = [
                    'bill_request_id' => $billRequest->id,
                ];
                RequestResponse::create($resData);

                $type = Category::where('id', $newType)->first();

                $this->sendPushNotification($fcmToken,'Anfrage Zum Hochladen ' . $type->title . ' Rechnung', 'Laden Sie ein passendes Foto für die gewünschte Rechnung hoch' );

            }
            return response($fcmToken, '201');
        } else if (count($previousBills->bills) > 0 && !empty($newTypeTobeSaved)) {

            $bill = Bill::updateorcreate($billData);
            foreach ($newTypeTobeSaved as $newType) {
                BillCategory::create([
                    'bill_id' => $bill->id,
                    'category_id' => $newType,
                ]);
                $reqData = [
                    'bill_id' => $bill->id,
                    'category_id' => $newType,
                    'user_id' => $request->input('user')
                ];
                $billRequest = BillRequest::updateorcreate($reqData);

                $resData = [
                    'bill_request_id' => $billRequest->id,
                ];
                RequestResponse::updateorcreate($resData);

                $type = Category::where('id', $newType)->first();

                $this->sendPushNotification($fcmToken,'Anfrage zum Hochladen ' . $type->title . ' Rechnung', 'Laden Sie ein passendes Foto für die gewünschte Rechnung hoch' );

            }
            return response($fcmToken, '201');
        } else {

            return response('Request Already Exists', 202);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param BillRequest $request
     * @return Response
     */
    public function show(Request $request)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param BillRequest $request
     * @return Response
     */
    public function edit(Request $request)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param BillRequest $request
     * @return Response
     */
    public function update(Request $request)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param BillRequest $request
     * @return Response
     */
    public function destroy(Request $request)
    {
        //
    }

    private function sendPushNotification($fcmToken, $title, $message){
        Larafirebase::withTitle($title)
            ->withBody($message)
            ->sendNotification($fcmToken);
    }

    /**
     * @param $id
     * @return Response
     */
    public function approve($id): Response
    {

        $billRequest = BillRequest::with(['bill' => function ($q) {
            $q->with('user');
        }])->with('type')->find($id);

        $billRequest->update(['status' => '2', 'published' => 1]);

        $response = $billRequest->response;
        $response->update(['message' => '1 Image Was Approved']);

        $notificationData = [
            'bill_request_id' => $billRequest->id,
            'user_id' => $billRequest->bill->user->id
        ];
        $notification = Notification::updateorcreate($notificationData);
        $notification->update(['seen' => 0]);

        $type=$billRequest->type->title;

        $fcmToken = Device::whereNotNull('token')->where('user_id', $billRequest->bill->user->id)->pluck('token')->toArray();
        $this->sendPushNotification($fcmToken,'1 Image Was Approved For ' .$type. ' Bill', 'Open app to see details' );

        return \response($response, '201');
    }

    /**
     * @param Request $request
     * @param $id
     * @return Response
     */
    public function reject(Request $request, $id): Response
    {
        $billRequest = BillRequest::with(['bill' => function ($q) {
            $q->with('user');
        }])->with('type')->find($id);

        $billRequest->update(['status' => '3', 'published' => 1]);

        $response = $billRequest->response;
        $response->update(['message' => $request->input('message')]);

        $notificationData = [
            'bill_request_id' => $billRequest->id,
            'user_id' => $billRequest->bill->user->id
        ];
        $notification = Notification::updateorcreate($notificationData);
        $notification->update(['seen' => 0]);

        $type=$billRequest->type->title;

        $fcmToken = Device::whereNotNull('token')->where('user_id', $billRequest->bill->user->id)->pluck('token')->toArray();
        $this->sendPushNotification($fcmToken,'1 Image Was Rejected For '.$type. ' Bill', $request->input('message') );

        return \response($response, '201');
    }
}
