<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\EducationalProgram;

class EducationalProgramController extends Controller
{
    public function index()
    {
        $programs = EducationalProgram::all();
        return response()->json($programs);
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $program = new EducationalProgram();
        $program->program_name = $validatedData['name'];
        $program->save();

        return response()->json($program, 201);
    }

    public function show($id)
    {
        $program = EducationalProgram::findOrFail($id);
        return response()->json($program);
    }

    public function update(Request $request, $id)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:50',
        ]);

        $program = EducationalProgram::findOrFail($id);
        $program->program_name = $validatedData['name'];
        $program->save();

        return response()->json($program);
    }

    public function destroy($id)
    {
        $program = EducationalProgram::findOrFail($id);
        $program->delete();

        return response()->json(['message' => 'Program deleted successfully']);
    }
}
