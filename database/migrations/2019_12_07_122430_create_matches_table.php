<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMatchesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('matches', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->bigInteger('inviter_id')->unsigned();
            $table->bigInteger('invitee_id')->unsigned();
            $table->boolean('accepted')->default(false);
            $table->bigInteger('winner_id')->unsigned()->nullable();
            $table->bigInteger('loser_id')->unsigned()->nullable();
            $table->boolean('is_draw')->default(false);
            $table->timestamps();

            $table->foreign('inviter_id')->references('id')
                ->on('users');
            $table->foreign('invitee_id')->references('id')
                ->on('users');
            $table->foreign('winner_id')->references('id')
                ->on('users');
            $table->foreign('loser_id')->references('id')
                ->on('users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matches');
    }
}
