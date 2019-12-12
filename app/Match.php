<?php


namespace App;


use Illuminate\Database\Eloquent\Model;

/**
 * Auto generated by IntelliJ IDEA
 *
 * @property User winner
 * @property User loser
 * @property User inviter
 * @property User invitee
 * @author<rendy, rendyananta66@gmail.com>
 * at 07/12/2019 - 19:29
 */
class Match extends Model
{
    protected $table = 'matches';

    protected $fillable = [
        'is_draw', 'state'
    ];

    public function inviter()
    {
        return $this->belongsTo(User::class, 'inviter_id');
    }

    public function invitee()
    {
        return $this->belongsTo(User::class, 'invitee_id');
    }

    public function winner()
    {
        return $this->belongsTo(User::class, 'winner_id');
    }

    public function loser()
    {
        return $this->belongsTo(User::class, 'loser_id');
    }

}
