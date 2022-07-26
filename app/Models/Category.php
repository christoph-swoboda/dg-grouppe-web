<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\BelongsToOne;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
    ];

    /**
     * @return BelongsToMany
     */
    public function bills(): BelongsToMany
    {
        return $this->belongsToMany(Bill::class, 'bill_categories', 'category_id', 'bill_id');
    }

    public function type(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(BillRequest::class,'category_id', 'id');
    }
    /**
     * @return BelongsToMany
     */
    public function employee(): BelongsToMany
    {
        return $this->belongsToMany(Employee::class, 'employee_categories', 'category_id', 'employee_id');
    }
}
