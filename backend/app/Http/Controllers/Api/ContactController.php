<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreContactRequest;
use App\Http\Resources\ContactResource;
use App\Mail\NewContactMessage;
use App\Models\Contact;
use App\Models\Profile;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * POST /api/contacts
     */
    public function store(StoreContactRequest $request): JsonResponse
    {
        $contact = Contact::create($request->validated());

        $notifyEmail = Profile::current()->email;

        if ($notifyEmail) {
            try {
                Mail::to($notifyEmail)->send(new NewContactMessage($contact));
            } catch (\Throwable $e) {
                // Don't fail the request just because the email notification failed —
                // the message is already saved and visible in the admin panel.
                Log::warning('Failed to send contact notification email: ' . $e->getMessage());
            }
        }

        return response()->json([
            'message' => 'ขอบคุณที่ติดต่อมา จะรีบตอบกลับโดยเร็ว',
            'data'    => new ContactResource($contact),
        ], 201);
    }
}
