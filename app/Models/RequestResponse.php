<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class RequestResponse extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'bill_request_id',
        'message',
        'image',
    ];

    /**
     *Bill Request Relation
     * @return BelongsTo
     */

    public function request(): BelongsTo
    {
        return $this->belongsTo(BillRequest::class, 'bill_request_id', 'id');
    }

}
