<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateOrdersTable extends Migration
{
    /**
     * Run the migrations.
     *protected $fillable = [
     * @return void
     */
    public function up()
    {
        Schema::create('orders', function (Blueprint $table) {
            $table->id('order_no');
            $table->string('orderId')->nullable();
            $table->string('order_time')->nullable();
            $table->string('orderedItems')->nullable();
            $table->integer('uid');
            $table->double('price')->default(0);
            $table->string('email')->nullable();
            $table->string('full_name')->nullable();
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
        Schema::dropIfExists('orders');
    }
}
