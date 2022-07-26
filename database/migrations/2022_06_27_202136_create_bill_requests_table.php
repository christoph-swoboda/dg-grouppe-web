<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBillRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bill_requests', function (Blueprint $table) {
            $table->id();
            $table->integer('bill_id');
            $table->integer('category_id');
            $table->integer('user_id');
            $table->boolean('published');
            $table->enum('status', [1,2,3])->default(1)->comment('1 for pending, 2 for approved, 3 for rejected');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bill_requests');
    }
}
