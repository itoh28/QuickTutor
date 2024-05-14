<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ManualRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'media_id' => 'required|exists:media,id',
            'manual_title' => 'required|string|max:30',
            'genres' => 'required|array|max:5',
            'genres.*' => 'exists:genres,id',
            'steps' => 'required|array|max:50',
            'steps.*.step_subtitle' => 'required|string|max:25',
            'steps.*.step_comment' => 'required|string|max:200',
            'is_draft' => 'boolean',
        ];
    }
}
