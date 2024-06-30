<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Http\Requests\UpdateUsernameRequest;
use App\Http\Resources\UserResource;

class UserController extends Controller
{
    public function updateUsername(UpdateUsernameRequest $request)
    {
        $user = Auth::user();

        if ($user->username !== $request->currentUsername) {
            return response()->json(['error' => 'Current username does not match'], 400);
        }

        $updated = User::where('id', $user->id)
            ->update(['username' => $request->newUsername]);

        if ($updated) {
            $user->username = $request->newUsername;
            return new UserResource($user);
        } else {
            return response()->json(['error' => 'Failed to update username'], 500);
        }
    }
}
