<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Employee extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'user_id',
        'gender',
        'image',
        'phone',
        'address',
    ];
    /**
     * @return BelongsTo
     */
    public function credentials(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Employee Categories Pivot Relation
     * @return BelongsToMany
     */

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'employee_categories', 'employee_id', 'category_id')->withPivot('id');
    }
}
