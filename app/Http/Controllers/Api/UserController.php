<?php


namespace App\Http\Controllers\Api;


use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;

/**
 * Auto generated by IntelliJ IDEA
 *
 * @author<rendy, rendyananta66@gmail.com>
 * at 07/12/2019 - 19:45
 */
class UserController extends Controller
{

    /**
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function index()
    {
        return User::query()->paginate();
    }

    /**
     * @param Request $request
     * @return \Illuminate\Http\JsonResponse
     * @throws \Illuminate\Validation\ValidationException
     */
    public function avatar(Request $request)
    {
        $this->validate($request, [
            'avatar' => 'required|file|picture'
        ]);

        $path = $request->file('avatar')->store('public');
        $request->user()->avatar = $path;
        $request->user()->save();

        return response()->json([
            'message' => 'Avatar successfully updated'
        ]);
    }

}
