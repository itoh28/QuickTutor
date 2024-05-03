<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Group;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'group_name' => ['required', 'string', 'max:255', 'exists:groups,group_name'],
                'username' => ['required', 'string', 'max:50', 'unique:users,username'],
                'password' => ['required', 'string', 'min:8', 'regex:/[a-z]/', 'regex:/[0-9]/'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        $group = Group::where('group_name', $validatedData['group_name'])->firstOrFail();

        $user = User::create([
            'group_id' => $group->id,
            'username' => $validatedData['username'],
            'password' => Hash::make($validatedData['password']),
            'role_id' => 3
        ]);

        $token = $user->createToken('API Token')->plainTextToken;

        return response()->json(['user' => $user, 'token' => $token], 201);
    }

    public function login(Request $request)
    {
        try {
            $credentials = $request->validate([
                'username' => ['required'],
                'password' => ['required'],
            ]);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        }

        if (Auth::attempt($credentials)) {
            $user = User::where('username', $request->username)->first();
            $user->tokens()->delete();
            $token = $user->createToken('API Token')->plainTextToken;
            return response()->json(['user' => $user, 'token' => $token], 200);
        }

        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function getUser(Request $request)
    {
        $user = $request->user();
        $user->role_name = $user->role->role_name;

        return response()->json($user);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
