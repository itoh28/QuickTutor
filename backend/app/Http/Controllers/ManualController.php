<?php

namespace App\Http\Controllers;

use App\Models\Manual;
use App\Http\Requests\ManualRequest;
use App\Http\Resources\ManualResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ManualController extends Controller
{
    public function index()
    {
        $manuals = Manual::with(['media', 'genres', 'users'])->get();
        return ManualResource::collection($manuals);
    }

    public function store(ManualRequest $request)
    {
        try {
            $manual = Manual::create($request->only(['media_id', 'manual_title', 'is_draft']));
            $manual->genres()->attach($request->genres);
            $manual->steps()->createMany($request->steps);

            $user = Auth::user();
            if ($user) {
                $manual->users()->attach($user->id);
            }

            $manual->load('media', 'genres', 'steps', 'users');

            return new ManualResource($manual);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@store: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred'], 500);
        }
    }


    public function show($id)
    {
        $manual = Manual::with(['users', 'steps', 'media', 'genres'])->findOrFail($id);
        return new ManualResource($manual);
    }

    public function update(ManualRequest $request, $id)
    {
        $manual = Manual::findOrFail($id);
        $manual->update($request->only(['media_id', 'manual_title', 'is_draft']));
        $manual->genres()->sync($request->genres);
        foreach ($request->steps as $step) {
            $manual->steps()->updateOrCreate(['id' => $step['id'] ?? null], $step);
        }

        $user = Auth::user();
        if ($user) {
            $manual->users()->attach([$user->id]);
        }

        $manual->load('media', 'genres', 'steps', 'users');

        return new ManualResource($manual);
    }

    public function destroy($id)
    {
        $manual = Manual::findOrFail($id);
        $manual->delete();
        return response()->json(['message' => 'Manual deleted successfully']);
    }

    public function trashed()
    {
        $trashedManuals = Manual::with(['media', 'genres', 'users'])->onlyTrashed()->get();
        return ManualResource::collection($trashedManuals);
    }

    public function restore($id)
    {
        $manual = Manual::with(['users', 'steps', 'media', 'genres'])->onlyTrashed()->findOrFail($id);
        $manual->restore();
        return new ManualResource($manual);
    }

    public function drafts()
    {
        try {
            $drafts = Manual::with(['media', 'genres', 'users'])->where('is_draft', true)->get();
            return ManualResource::collection($drafts);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@drafts: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching drafts'], 500);
        }
    }
}
