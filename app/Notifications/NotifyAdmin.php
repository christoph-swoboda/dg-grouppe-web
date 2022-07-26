<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NotifyAdmin extends Notification
{
    use Queueable;

    private $details;


    /**
     * Create a new notification instance.
     *
     * @return void
     */

    public function __construct($details)

    {

        $this->details = $details;

    }

    /**
     * Get the notification's delivery channels.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function via($notifiable): array
    {
        return ['mail', 'broadcast'];
    }

    /**
     * Get the mail representation of the notification.
     *
     * @param mixed $notifiable
     * @return MailMessage
     */
    public function toMail($notifiable): MailMessage
    {
        $messages = [];
        foreach ($this->details['body'] as $detail) {
            if ($detail->stock < $detail->threshold) {
                $messages[] = " $detail->name's Left : $detail->stock "." || ";
            }
        }

        return (new MailMessage)
            ->line($this->details['greeting'])
            ->line($messages)
            ->action($this->details['instruction'], url('/settings/inventory'))
            ->line($this->details['thanks']);
    }

    /**
     * Get the array representation of the notification.
     *
     * @param mixed $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            //
        ];
    }
}
