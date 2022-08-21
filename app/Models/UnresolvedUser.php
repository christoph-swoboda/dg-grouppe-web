<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class UnresolvedUser extends Model
{
    use HasFactory;
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'email',
        'password',
        'first_name',
        'last_name',
        'gender',
        'phone',
        'phone_number',
        'internet',
        'car',
        'train',
        'address',
    ];

    public function types(): BelongsToMany
    {
        return $this->belongsToMany(Category::class, 'employee_categories', 'employee_id', 'category_id')->withPivot('id');
    }
}
