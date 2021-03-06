<?php

namespace App;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Storage;
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


    /**
     * avatar_url Accessor
     *
     * @return \Illuminate\Contracts\Routing\UrlGenerator|string
     * @throws \Illuminate\Contracts\Filesystem\FileNotFoundException
     */
    public function getAvatarUrlAttribute()
    {
        return empty($this->getOriginal('avatar'))
            ? url('images/avatar-placeholder.png')
            : url(asset('storage/' . $this->getOriginal('avatar')));
    }
}
