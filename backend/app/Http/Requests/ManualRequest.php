<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\Log;

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
            'genres.*' => 'required|string|max:15',
            'steps' => 'required|array|max:50',
            'steps.*.step_subtitle' => 'required|string|max:25',
            'steps.*.step_comment' => 'required|string|max:200',
            'steps.*.media_id' => 'required|exists:media,id',
            'is_draft' => 'boolean',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'media_id.exists' => 'トップ画像の設定は必須です。',
            'manual_title.required' => 'マニュアルタイトルの入力は必須です。',
            'manual_title.max' => 'マニュアルタイトルは最大30文字までです。',
            'genres.required' => 'ジャンルの設定は必須です。',
            'genres.max' => 'ジャンルは最大5つまで設定できます。',
            'genres.*.max' => 'ジャンル名は最大15文字までです。',
            'steps.required' => '1つ以上のステップが必要です。',
            'steps.max' => 'ステップは最大50個まで設定できます。',
            'steps.*.media_id.exists' => 'ステップ画像の設定は必須です。',
            'steps.*.step_subtitle.required' => 'ステップサブタイトルの入力は必須です。',
            'steps.*.step_subtitle.max' => 'ステップサブタイトルは最大25文字までです。',
            'steps.*.step_comment.required' => 'ステップコメントの入力は必須です。',
            'steps.*.step_comment.max' => 'ステップコメントは最大200文字までです。',
        ];
    }

    /**
     * Handle a failed validation attempt.
     *
     * @param Validator $validator
     * @throws ValidationException
     */
    protected function failedValidation(Validator $validator)
    {
        Log::error('Validation Failed:', $validator->errors()->toArray());
        throw new ValidationException($validator);
    }
}
