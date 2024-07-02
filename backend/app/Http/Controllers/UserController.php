<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use App\Models\User;
use App\Models\Group;
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

        $group = Group::where('group_name', $request->groupName)->first();

        if (!$group) {
            return response()->json(['error' => 'Group not found'], 404);
        }

        $existingUser = User::where('group_id', $group->id)
            ->where('username', $request->newUsername)
            ->first();

        if ($existingUser) {
            return response()->json(['error' => 'Username already exists in this group'], 422);
        }

        $updated = User::where('id', $user->id)
            ->update(['username' => $request->newUsername]);

        if ($updated) {
            $user = User::find($user->id);
            return new UserResource($user);
        } else {
            return response()->json(['error' => 'Failed to update username'], 500);
        }
    }
}
