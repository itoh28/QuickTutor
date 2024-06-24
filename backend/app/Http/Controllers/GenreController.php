<?php

namespace App\Http\Controllers;

use App\Models\Genre;
use Illuminate\Support\Facades\Log;

class GenreController extends Controller
{
    public function index()
    {
        return Genre::all();
    }

    public function destroy($id)
    {
        try {
            $genre = Genre::findOrFail($id);
            $genre->manuals()->detach();
            $genre->delete();
            return response()->json(['message' => 'Genre deleted successfully']);
        } catch (\Exception $e) {
            Log::error('Exception in GenreController@destroy: ' . $e->getMessage());
            return response()->json(['error' => 'An error occurred', 'message' => $e->getMessage()], 500);
        }
    }
}
