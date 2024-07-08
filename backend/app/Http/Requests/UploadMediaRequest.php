<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UploadMediaRequest extends FormRequest
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
            'file' => 'required|file|mimes:jpg,jpeg,JPG,JPEG,png,mp4,mov,MOV|max:108800', // 最大サイズは約106MB
        ];
    }

    /**
     * Get the custom messages for validator errors.
     *
     * @return array
     */
    public function messages(): array
    {
        return [
            'file.required' => 'ファイルの設定は必須です。',
            'file.mimes' => 'サポートされていないファイル形式です。jpg、jpeg、JPG、JPEG、png、mp4、mov、MOV形式のファイルを選択してください。',
            'file.max' => 'ファイルサイズが大きすぎます。最大サイズは106MBです。',
        ];
    }
}
