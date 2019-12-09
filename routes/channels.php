<?php

use App\Match;
use Illuminate\Support\Facades\Broadcast;

/*
|--------------------------------------------------------------------------
| Broadcast Channels
|--------------------------------------------------------------------------
|
| Here you may register all of the event broadcasting channels that your
| application supports. The given channel authorization callbacks are
| used to check if an authenticated user can listen to the channel.
|
*/

Broadcast::channel('invitations.{userId}', function ($user, $userId) {
    return $user->id == $userId;
});

Broadcast::channel('invitation_status.{matchId}', function ($user, $matchId) {
    /** @var Match $match */
    $match = Match::query()->findOrFail($matchId);

    return $match->invitee->id == $user->id || $match->inviter->id == $user->id;
});

Broadcast::channel('match.{matchId}', function ($user, $matchId) {
    /** @var Match $match */
    $match = Match::query()->findOrFail($matchId);

    return $match->invitee->id == $user->id || $match->inviter->id == $user->id;
});
