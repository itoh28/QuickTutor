<?php

namespace App\Http\Controllers;

use App\Models\Manual;
use App\Models\Genre;
use App\Http\Requests\ManualRequest;
use App\Http\Resources\ManualResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class ManualController extends Controller
{
    public function index()
    {
        $manuals = Manual::with(['media', 'genres', 'users'])->paginate(50);
        return ManualResource::collection($manuals)->additional([
            'meta' => [
                'total' => $manuals->total(),
                'current_page' => $manuals->currentPage(),
                'last_page' => $manuals->lastPage(),
                'per_page' => $manuals->perPage(),
                'from' => $manuals->firstItem(),
                'to' => $manuals->lastItem(),
            ]
        ]);
    }

    public function store(ManualRequest $request)
    {
        try {
            $genreIds = [];
            $genres = $request->input('genres', []);
            foreach ($genres as $genre) {
                $genreModel = Genre::firstOrCreate(['genre_name' => $genre]);
                $genreIds[] = $genreModel->id;
            }

            $manual = Manual::create($request->only(['media_id', 'manual_title', 'is_draft']));
            $manual->genres()->attach($genreIds);

            $stepsData = [];
            foreach ($request->steps as $step) {
                $stepsData[] = [
                    'step_subtitle' => $step['step_subtitle'],
                    'step_comment' => $step['step_comment'],
                    'media_id' => $step['media_id'] ?? null,
                ];
            }

            foreach ($stepsData as $stepData) {
                $manual->steps()->create($stepData);
            }

            $user = Auth::user();
            if ($user) {
                $manual->users()->attach($user->id);
            }

            $manual->load('media', 'genres', 'steps', 'users');

            return new ManualResource($manual);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@store: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
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
