<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;

class ContactController extends Controller
{
    /**
     * POST /api/contacts
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        return response()->json([
            'message' => 'ขอบคุณที่ติดต่อมา จะรีบตอบกลับโดยเร็ว',
            'data'    => new ContactResource($contact),
        ], 201);
    }
}
