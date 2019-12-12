<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'avatar', 'win', 'lose', 'draw'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function incrementWin()
    {
        $this->setAttribute('win', $this->getAttribute('win') + 1);
    }

    public function incrementLose()
    {
        $this->setAttribute('lose', $this->getAttribute('lose') + 1);
    }

    public function incrementDraw()
    {
        $this->setAttribute('draw', $this->getAttribute('draw') + 1);
    }
}
