<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function register(RegisterRequest $request)
    {
        try {
            $group = Group::where('group_name', $request->group_name)->firstOrFail();
            $user = User::create([
                'group_id' => $group->id,
                'username' => $request->username,
                'password' => Hash::make($request->password),
                'role_id' => 3
            ]);

            return response()->json(['user' => new UserResource($user)], 201);
        } catch (\Exception $e) {
            return response()->json(['message' => 'User registration failed', 'error' => $e->getMessage()], 400);
        }
    }

    public function login(LoginRequest $request)
    {
        if (Auth::attempt($request->only(['username', 'password']))) {
            $request->session()->regenerate();
            $user = Auth::user();
            return response()->json(['user' => new UserResource($user)], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function getUser()
    {
        $user = Auth::user();
        if (!$user) {
            Log::info('User not authenticated');
            return response()->json(['message' => 'User not authenticated'], 401);
        }
        return new UserResource($user);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
