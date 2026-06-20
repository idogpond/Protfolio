<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Contracts\Validation\Validator;
use Illuminate\Http\Exceptions\HttpResponseException;

class StoreProjectRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title'          => ['required', 'string', 'max:255'],
            'title_th'       => ['nullable', 'string', 'max:255'],
            'description'    => ['required', 'string'],
            'description_th' => ['nullable', 'string'],
            'tech_stack'     => ['nullable', 'array'],
            'tech_stack.*'=> ['string', 'max:50'],
            'github_url'  => ['nullable', 'url', 'max:255'],
            'demo_url'    => ['nullable', 'url', 'max:255'],
            'image_url'   => ['nullable', 'string', 'max:255'],
            'is_featured' => ['boolean'],
            'order'       => ['integer', 'min:0'],
        ];
    }

    protected function failedValidation(Validator $validator): never
    {
        throw new HttpResponseException(
            response()->json(['message' => 'Validation failed', 'errors' => $validator->errors()], 422)
        );
    }
}
