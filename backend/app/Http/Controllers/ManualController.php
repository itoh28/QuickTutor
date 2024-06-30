<?php

namespace App\Http\Controllers;

use App\Models\Manual;
use App\Models\Genre;
use App\Http\Requests\ManualRequest;
use App\Http\Resources\ManualResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException;

class ManualController extends Controller
{
    public function index()
    {
        $manuals = Manual::with(['media', 'genres', 'users'])
            ->where('is_draft', false)
            ->paginate(50);

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
        $manual = Manual::with(['users', 'steps.media', 'media', 'genres'])->findOrFail($id);
        Log::info('Manual Response:', $manual->toArray());
        return new ManualResource($manual);
    }

    public function update(ManualRequest $request, $id)
    {
        try {
            Log::info('Update Request Data:', $request->all());

            $manual = Manual::findOrFail($id);

            $manual->update($request->only(['media_id', 'manual_title', 'is_draft']));

            $genreIds = [];
            foreach ($request->input('genres', []) as $genre) {
                $genreModel = Genre::firstOrCreate(['genre_name' => $genre]);
                $genreIds[] = $genreModel->id;
            }
            $manual->genres()->sync($genreIds);

            $manual->steps()->delete();
            foreach ($request->input('steps', []) as $step) {
                $manual->steps()->create([
                    'step_subtitle' => $step['step_subtitle'],
                    'step_comment' => $step['step_comment'],
                    'media_id' => $step['media_id'] ?? null,
                ]);
            }

            $user = Auth::user();
            if ($user) {
                $manual->users()->syncWithoutDetaching([$user->id]);
            }

            $manual->load('media', 'genres', 'steps', 'users');

            return new ManualResource($manual);
        } catch (ValidationException $e) {
            Log::error('Validation Errors:', $e->errors());
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@update: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $manual = Manual::findOrFail($id);
        $manual->delete();
        return response()->json(['message' => 'Manual deleted successfully']);
    }

    public function trashed()
    {
        try {
            $trashedManuals = Manual::onlyTrashed()->with(['media', 'genres', 'users'])->paginate(50);
            return ManualResource::collection($trashedManuals)->additional([
                'meta' => [
                    'total' => $trashedManuals->total(),
                    'current_page' => $trashedManuals->currentPage(),
                    'last_page' => $trashedManuals->lastPage(),
                    'per_page' => $trashedManuals->perPage(),
                    'from' => $trashedManuals->firstItem(),
                    'to' => $trashedManuals->lastItem(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@trashed: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching trashed manuals'], 500);
        }
    }

    public function restore($id)
    {
        try {
            $manual = Manual::onlyTrashed()->with(['users', 'steps', 'media', 'genres'])->findOrFail($id);
            $manual->restore();
            return new ManualResource($manual);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@restore: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while restoring the manual'], 500);
        }
    }

    public function drafts()
    {
        try {
            $drafts = Manual::with(['media', 'genres', 'users'])
                ->where('is_draft', true)
                ->paginate(50);

            return ManualResource::collection($drafts)->additional([
                'meta' => [
                    'total' => $drafts->total(),
                    'current_page' => $drafts->currentPage(),
                    'last_page' => $drafts->lastPage(),
                    'per_page' => $drafts->perPage(),
                    'from' => $drafts->firstItem(),
                    'to' => $drafts->lastItem(),
                ]
            ]);
        } catch (\Exception $e) {
            Log::error('Exception in ManualController@drafts: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred while fetching drafts'], 500);
        }
    }

    public function getManualsByGenre($id)
    {
        $genre = Genre::findOrFail($id);
        $manuals = $genre->manuals()->with(['media', 'genres', 'users'])->paginate(50);
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
}
