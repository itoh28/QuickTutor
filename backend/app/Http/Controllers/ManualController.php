<?php

namespace App\Http\Controllers;

use App\Models\Manual;
use App\Models\Genre;
use App\Http\Requests\ManualRequest;
use App\Http\Resources\ManualResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class ManualController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $manuals = Manual::with(['media', 'genres', 'users'])
            ->where('is_draft', false)
            ->whereHas('users', function ($query) use ($user) {
                $query->where('group_id', $user->group_id);
            })
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
            $user = Auth::user();
            if (!$user) {
                throw new \Exception("User not authenticated");
            }

            $genreIds = [];
            $genres = $request->input('genres', []);
            foreach ($genres as $genre) {
                $genreModel = Genre::firstOrCreate([
                    'genre_name' => $genre,
                    'group_id' => $user->group_id
                ]);
                $genreIds[] = $genreModel->id;
            }

            $manualData = $request->only(['media_id', 'manual_title', 'is_draft']);
            $manualData['group_id'] = $user->group_id;
            $manual = Manual::create($manualData);
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

            if ($user) {
                $manual->users()->attach($user->id);
            }

            $manual->load('media', 'genres', 'steps', 'users');

            return new ManualResource($manual);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }

    public function show($id)
    {
        try {
            $user = Auth::user();
            $manual = Manual::with(['users', 'steps.media', 'media', 'genres'])
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
                ->findOrFail($id);

            return new ManualResource($manual);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }

    public function update(ManualRequest $request, $id)
    {
        try {
            $manual = Manual::findOrFail($id);

            $manual->update($request->only(['media_id', 'manual_title', 'is_draft']));

            $user = Auth::user();
            if (!$user) {
                throw new \Exception("User not authenticated");
            }

            $genreIds = [];
            foreach ($request->input('genres', []) as $genre) {
                $genreModel = Genre::firstOrCreate([
                    'genre_name' => $genre,
                    'group_id' => $user->group_id
                ]);
                $genreIds[] = $genreModel->id;
            }
            $manual->genres()->sync($genreIds);

            $deletedGenres = Genre::whereDoesntHave('manuals')->get();
            foreach ($deletedGenres as $deletedGenre) {
                $deletedGenre->delete();
            }

            $manual->steps()->delete();
            foreach ($request->input('steps', []) as $step) {
                $manual->steps()->create([
                    'step_subtitle' => $step['step_subtitle'],
                    'step_comment' => $step['step_comment'],
                    'media_id' => $step['media_id'] ?? null,
                ]);
            }

            if ($user) {
                $manual->users()->syncWithoutDetaching([$user->id]);
            }

            $manual->load('media', 'genres', 'steps', 'users');

            return new ManualResource($manual);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 422);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $manual = Manual::where('id', $id)
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
                ->firstOrFail();
            $manual->delete();

            return response()->json(['message' => 'Manual deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while deleting the manual'], 500);
        }
    }

    public function permanentDestroy($id)
    {
        try {
            $user = Auth::user();
            $manual = Manual::onlyTrashed()
                ->where('id', $id)
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
                ->firstOrFail();
            $manual->forceDelete();

            return response()->json(['message' => 'Manual permanently deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while permanently deleting the manual'], 500);
        }
    }

    public function trashed()
    {
        try {
            $user = Auth::user();
            $trashedManuals = Manual::onlyTrashed()
                ->with(['media', 'genres', 'users'])
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
                ->paginate(50);
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
            return response()->json(['error' => 'An error occurred while fetching trashed manuals'], 500);
        }
    }

    public function restore($id)
    {
        try {
            $user = Auth::user();
            $manual = Manual::onlyTrashed()
                ->where('id', $id)
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
                ->firstOrFail();
            $manual->restore();
            return new ManualResource($manual);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while restoring the manual'], 500);
        }
    }

    public function drafts()
    {
        try {
            $user = Auth::user();
            $drafts = Manual::with(['media', 'genres', 'users'])
                ->where('is_draft', true)
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
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
            return response()->json(['error' => 'An error occurred while fetching drafts'], 500);
        }
    }

    public function getManualsByGenre($id)
    {
        try {
            $user = Auth::user();
            $genre = Genre::where('id', $id)
                ->where('group_id', $user->group_id)
                ->firstOrFail();
            $manuals = $genre->manuals()
                ->with(['media', 'genres', 'users'])
                ->whereHas('users', function ($query) use ($user) {
                    $query->where('group_id', $user->group_id);
                })
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
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred while fetching manuals by genre'], 500);
        }
    }

    public function getPublishedGenres()
    {
        $user = Auth::user();
        $genres = Genre::whereHas('manuals', function ($query) {
            $query->where('is_draft', false);
        })
            ->where('group_id', $user->group_id)
            ->get();

        return response()->json($genres);
    }
}
