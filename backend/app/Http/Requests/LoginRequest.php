<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\ValidationException;
use App\Models\Group;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LoginRequest extends FormRequest
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
            'group_name' => ['required'],
            'username' => ['required'],
            'password' => ['required'],
        ];
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
            'username.required' => 'ユーザー名の入力は必須です。',
            'password.required' => 'パスワードの入力は必須です。',
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation()
    {
        $this->checkCredentials();
    }

    /**
     * Check if the provided credentials are valid.
     *
     * @throws ValidationException
     */
    protected function checkCredentials()
    {
        $group = Group::where('group_name', $this->group_name)->first();

        if (!$group) {
            throw ValidationException::withMessages([
                'group_name' => 'グループ名が違います。',
            ]);
        }

        $user = User::where('username', $this->username)->where('group_id', $group->id)->first();

        if (!$user) {
            throw ValidationException::withMessages([
                'username' => 'ユーザー名が違います。',
            ]);
        }

        if (!Hash::check($this->password, $user->password)) {
            throw ValidationException::withMessages([
                'password' => 'パスワードが違います。',
            ]);
        }
    }
}
