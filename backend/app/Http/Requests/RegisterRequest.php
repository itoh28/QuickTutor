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
}
