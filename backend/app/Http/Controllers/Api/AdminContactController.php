<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\ContactResource;
use App\Models\Contact;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class AdminContactController extends Controller
{
    /**
     * GET /api/admin/contacts
     */
    public function index(): AnonymousResourceCollection
    {
        $contacts = Contact::orderByDesc('created_at')->get();

        return ContactResource::collection($contacts);
    }

    /**
     * PATCH /api/admin/contacts/{contact}/read
     */
    public function markAsRead(Contact $contact): JsonResponse
    {
        $contact->update(['is_read' => true]);

        return response()->json([
            'message' => 'Marked as read',
            'data'    => new ContactResource($contact->fresh()),
        ]);
    }
}
