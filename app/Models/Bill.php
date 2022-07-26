<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Bill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'title',
        'description',
        'user_id',
        'created_at',
    ];

    /**
     * Bill Categories Pivot Relation
     * @return BelongsToMany
     */

    public function type(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'bill_categories', 'bill_id', 'category_id')->withPivot('id');
    }

    /**
     * Bill Requests Relation
     * @return HasMany
     */

    public function requests(): HasMany
    {
        return $this->hasMany(BillRequest::class);
    }

    /**
     * Bill Requests Relation
     * @return BelongsTo
     */

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
