<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const ADMIN = 1;
    public const USER = 2;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'role',
        'password',
        'enabled',
        'last_response_at'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];


    /**
     * @return HasOne
     */
    public function admins(): HasOne
    {
        return $this->hasOne(Admin::class);
    }

    /**
     * @return HasOne
     */
    public function employees(): HasOne
    {
        return $this->hasOne(Employee::class);
    }

    /**
     * @return HasMany
     */
    public function device(): HasMany
    {
        return $this->hasMany(Device::class);
    }

        /**
     * Bills Relation
     * @return HasMany
     */

    public function bills(): HasMany
    {
        return $this->hasMany(Bill::class);
    }

            /**
     * Bills Relation
     * @return HasMany
     */

    public function notifications(): HasMany
    {
        return $this->hasMany(Notification::class);
    }


    /**
     * Notification  Relation
     * @return HasMany
     */

    public function response(): HasMany
    {
        return $this->hasMany(Notification::class);
    }

    public function getUserTypeAttribute(): string
    {
        if (auth()->user()->role === self::ADMIN) {
            $type = 'admin';
        } else {
            $type = 'user';
        }
        return $type;
    }

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'user.' . $this->id;
    }
}
