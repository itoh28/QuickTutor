<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
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
            'group_name' => ['required', 'string', 'max:255', 'exists:groups,group_name'],
            'username' => [
                'required',
                'string',
                'max:50',
                Rule::unique('users')->where(function ($query) {
                    return $query->where('group_id', $this->getGroupId());
                }),
            ],
            'password' => ['required', 'string', 'min:8', 'regex:/[a-z]/', 'regex:/[0-9]/'],
        ];
    }

    /**
     * Get the group ID based on the group name.
     *
     * @return int|null
     */
    protected function getGroupId()
    {
        return \App\Models\Group::where('group_name', $this->input('group_name'))->value('id');
    }

    /**
     * Get the validation messages that apply to the request.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'group_name.required' => 'グループ名の入力は必須です。',
            'group_name.max' => 'グループ名は最大255文字までです。',
            'group_name.exists' => '指定されたグループ名は存在しません。',
            'username.required' => 'ユーザー名の入力は必須です。',
            'username.max' => 'ユーザー名は最大50文字までです。',
            'username.unique' => 'このユーザー名は既に使用されています。',
            'password.required' => 'パスワードの入力は必須です。',
            'password.min' => 'パスワードは8文字以上である必要があります。',
            'password.regex' => 'パスワードには少なくとも1つの英小文字と1つの数字を含める必要があります。',
        ];
    }
}
