<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasOneOrMany;

class Notification extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'user_id',
        'bill_request_id',
        'seen'
    ];

    /**
     * Bill Request Relation
     * @return HasOne
     */

    public function request(): HasOne
    {
        return $this->hasOne(BillRequest::class, 'id', 'bill_request_id');
    }

    /**
     * Employee Relation
     * @return BelongsTo
     */

    public function employee(): BelongsTo
    {
        return $this->belongsTo(Employee::class);
    }

    /**
     * Response Relation
     * @return HasOne
     */

    public function response(): HasOne
    {
        return $this->hasOne(RequestResponse::class);
    }
}
