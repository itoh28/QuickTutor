<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Support\Facades\Auth;

class GenreController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $genres = Genre::where('group_id', $user->group_id)->get();
        return response()->json($genres);
    }

    public function destroy($id)
    {
        try {
            $user = Auth::user();
            $genre = Genre::where('id', $id)
                ->where('group_id', $user->group_id)
                ->firstOrFail();

            if ($genre->manuals()->exists()) {
                return response()->json(['error' => 'Genre is used in manuals'], 400);
            }

            $genre->delete();
            return response()->json(['message' => 'Genre deleted successfully']);
        } catch (\Exception $e) {
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }
}
