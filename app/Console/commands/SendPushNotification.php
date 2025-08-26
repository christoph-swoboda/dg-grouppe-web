<?php


namespace App\Console\commands;


use App\Models\Bill;
use App\Models\BillCategory;
use App\Models\BillRequest;
use App\Models\Device;
use App\Models\RequestResponse;
use App\Models\User;
use App\Repositories\Notifications\NotificationRepository;
use App\Repositories\Request\RequestRepository;
use Carbon\Carbon;
use Illuminate\Console\Command;
use Kutia\Larafirebase\Facades\Larafirebase;


class SendPushNotification extends Command

{

    public $notificationsRepository;

    public function __construct(NotificationRepository $notificationRepository)
    {
        $this->notificationsRepository = $notificationRepository;
        parent::__construct();
    }


    /**
     * The name and signature of the console command.
     *
     * @var string
     */

    protected $signature = 'sendNotification:cron';


    /**
     * The console command description.
     *
     * @var string
     */

    protected $description = 'Sending requests at the start of every period to all users';



    /**
     * Execute the console command.
     *
     * @return mixed
     */

    public function handle()

    {

        \Log::info("Requests Sent!");
        $year = Carbon::now()->year;
        $month = Carbon::now()->month;

        if ($month <= 4) {
            $period = '1';
        } else if ($month >= 5 && $month <= 8) {
            $period = '2';
        } else {
            $period = '3';
        }

        $fcmTokens = Device::whereNotNull('token')->get();

        $users = User::where('role', '!=', 1)->get();

        foreach ($users as $key => $User) {

            $previousBills = $this->notificationsRepository->PreviousBills($User->id, $year, $period);

            if (count($previousBills->bills) === 0) {
                $bill = Bill::create(['user_id' => $User->id]);

                $userWithTypes = User::where('id', $User->id)
                    ->with(['employees' => function ($q) {
                        $q->with('types');
                    }])->get();

                $userTypes = [];
                $userTypesTitle = [];
                foreach ($userWithTypes as $user) {
                    $employees = $user->employees;
                    foreach ($employees->types as $type) {
                        $userTypes[] = $type->id;
                        $userTypesTitle[] = $type->title;
                    }
                }

                foreach ($userTypes as $index => $userType) {
                    BillCategory::create([
                        'bill_id' => $bill->id,
                        'category_id' => $userType,
                    ]);

                    $billRequest = BillRequest::create([
                        'bill_id' => $bill->id,
                        'category_id' => $userType,
                        'user_id' => $User->id
                    ]);

                    RequestResponse::create([
                        'bill_request_id' => $billRequest->id,
                    ]);

                    $title = 'Request To Upload ' . $userTypesTitle[$index] . ' Bill';
                    $message = 'Upload appropriate photo for the required bill';
                    if ($User->id == $fcmTokens[$key]->user_id) {
                        Larafirebase::withTitle($title)
                            ->withBody($message)
                            ->sendNotification($fcmTokens[$key]->token);
                    }
                }
            }
        }
        return response($fcmTokens, 201);
    }
}
