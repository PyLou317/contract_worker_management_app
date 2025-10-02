from django.conf import settings
from twilio.rest import Client

def send_schedule_made_notification(to_number, message_body):
    try:
        client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
        message = client.messages.create(
            to=to_number,
            from_=settings.TWILIO_PHONE_NUMBER,
            body=message_body
        )
        print(f"Message sent successfully. SID: {message.sid}")
        return message.sid
    
    except Exception as e:
        print(f"Error sending SMS: {e}")
        return None