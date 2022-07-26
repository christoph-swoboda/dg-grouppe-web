<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class BillRequest extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'bill_id',
        'category_id',
        'user_id',
        'deadline',
        'status',
        'published',
    ];

    /**
     * Bill Requests Relation
     * @return BelongsTo
     */

    public function bill(): BelongsTo
    {
        return $this->belongsTo(Bill::class);
    }

        /**
     * Bill Requests Type Relation
     * @return HasOne
         */

    public function type(): HasOne
    {
        return $this->hasOne(Category::class, 'id', 'category_id');
    }

    /**
     * Requests Response Relation
     * @return HasOne
     */

    public function response(): HasOne
    {
        return $this->hasOne(RequestResponse::class);
    }

        /**
     * Notification Relation
     * @return BelongsTo
     */

    public function notification(): BelongsTo
    {
        return $this->belongsTo(Notification::class, 'bill_request_id','id');
    }

}
