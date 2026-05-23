<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreContactRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name'    => ['required', 'string', 'min:2', 'max:100'],
            'email'   => ['required', 'email', 'max:255'],
            'message' => ['required', 'string', 'min:10', 'max:2000'],
        ];
    }

    public function messages(): array
    {
        return [
            'name.required'    => 'กรุณากรอกชื่อ',
            'name.min'         => 'ชื่อต้องมีอย่างน้อย 2 ตัวอักษร',
            'email.required'   => 'กรุณากรอกอีเมล',
            'email.email'      => 'รูปแบบอีเมลไม่ถูกต้อง',
            'message.required' => 'กรุณากรอกข้อความ',
            'message.min'      => 'ข้อความต้องมีอย่างน้อย 10 ตัวอักษร',
            'message.max'      => 'ข้อความต้องไม่เกิน 2000 ตัวอักษร',
        ];
    }

    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json([
                'message' => 'Validation failed',
                'errors'  => $validator->errors(),
            ], 422)
        );
    }
}
