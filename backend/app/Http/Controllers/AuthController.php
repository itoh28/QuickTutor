<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $group = Group::where('group_name', $request->group_name)->firstOrFail();

            $existingUser = User::where('username', $request->username)
                ->where('group_id', $group->id)
                ->first();

            if ($existingUser) {
                return response()->json(['message' => 'Username already exists in this group'], 400);
            }

            $user = User::create([
                'group_id' => $group->id,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'role_id' => 3
            ]);

            $token = $user->createToken('API Token')->plainTextToken;
            return response()->json(['user' => new UserResource($user), 'token' => $token], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User registration failed', 'error' => $e->getMessage()], 400);
        }
    }

    public function login(LoginRequest $request)
    {
        try {
            $group = Group::where('group_name', $request->group_name)->firstOrFail();
            $user = User::where('username', $request->username)
                ->where('group_id', $group->id)
                ->first();

            if ($user && Hash::check($request->password, $user->password)) {
                $user->tokens()->delete();
                $token = $user->createToken('API Token')->plainTextToken;
                return response()->json(['user' => new UserResource($user), 'token' => $token], 200);
            }

            return response()->json(['message' => 'Invalid credentials'], 401);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Login failed', 'error' => $e->getMessage()], 400);
        }
    }

    public function getUser(Request $request)
    {
        $user = $request->user();

        return new UserResource($user);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
