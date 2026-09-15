<?php

namespace App\Mail;

use App\Models\Contact;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;

class NewContactMessage extends Mailable
{
    use SerializesModels;

    public function __construct(public Contact $contact)
    {
    }

    public function envelope(): Envelope
    {
        return new Envelope(
            subject: "New contact message from {$this->contact->name}",
            replyTo: [$this->contact->email],
        );
    }

    public function content(): Content
    {
        $name    = htmlspecialchars($this->contact->name, ENT_QUOTES);
        $email   = htmlspecialchars($this->contact->email, ENT_QUOTES);
        $message = nl2br(htmlspecialchars($this->contact->message, ENT_QUOTES));

        $html = "<p><strong>Name:</strong> {$name}</p>"
            . "<p><strong>Email:</strong> {$email}</p>"
            . "<p><strong>Message:</strong></p>"
            . "<p>{$message}</p>";

        return new Content(htmlString: $html);
    }
}
