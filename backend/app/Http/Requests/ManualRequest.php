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
            'genres.*' => 'required|string|max:15',
            'steps' => 'required|array|max:50',
            'steps.*.step_subtitle' => 'required|string|max:25',
            'steps.*.step_comment' => 'required|string|max:200',
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
            'media_id.required' => 'メディアIDが必要です。',
            'media_id.exists' => '指定されたメディアIDは存在しません。',
            'manual_title.required' => 'マニュアルタイトルが必要です。',
            'manual_title.max' => 'マニュアルタイトルは最大30文字までです。',
            'genres.required' => 'ジャンルが必要です。',
            'genres.array' => 'ジャンルは配列である必要があります。',
            'genres.max' => 'ジャンルは最大5つまで設定できます。',
            'genres.*.max' => 'ジャンル名は最大15文字までです。',
            'steps.required' => 'ステップが必要です。',
            'steps.array' => 'ステップは配列である必要があります。',
            'steps.max' => 'ステップは最大50個まで設定できます。',
            'steps.*.step_subtitle.required' => 'ステップサブタイトルが必要です。',
            'steps.*.step_subtitle.max' => 'ステップサブタイトルは最大25文字までです。',
            'steps.*.step_comment.required' => 'ステップコメントが必要です。',
            'steps.*.step_comment.max' => 'ステップコメントは最大200文字までです。',
            'is_draft.boolean' => 'ドラフトフラグは真偽値である必要があります。',
        ];
    }
}
