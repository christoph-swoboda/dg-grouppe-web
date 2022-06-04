<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    public const ADMIN = 1;
    public const STAFF = 2;
    public const USER = 3;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'address',
        'email',
        'role',
        'password',
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
     * @return HasMany
     */
    public function products(): HasMany
    {
        return $this->hasMany(Product::class);
    }

    public function orders(): HasMany
    {
        return $this->hasMany(Order::class);
    }

    public function getUserTypeAttribute(): string
    {
        switch (auth()->user()->role) {
            case User::ADMIN:
                $type = 'admin';
                break;
            case User::STAFF:
                $type = 'staff';
                break;
            default:
                $type = 'user';
        }
        return $type;
    }

    public function receivesBroadcastNotificationsOn(): string
    {
        return 'user.'.$this->id;
    }

//    public function getAuthIdentifier()
//    {
//        return $this->getKey();
//    }
//
//    public function getAuthPassword(): string
//    {
//        return $this->attributes['password'];
//    }
//
//    protected $appends = ['name'];
//

//    public function getNameAttribute(): string
//    {
//        return $this->getTitleAttribute() . ' ' . $this->attributes['first_name'] . ' ' . $this->attributes['last_name'];
//    }
//
//    public function getTitleAttribute(): string
//    {
//        return $this->attributes['gender'] == 'm' ? 'Mr.' : 'Mrs.';
//    }
}
