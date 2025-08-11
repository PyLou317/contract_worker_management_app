from allauth.account.adapter import DefaultAccountAdapter
from django.db import IntegrityError
from rest_framework.exceptions import ValidationError


class AccountAdapter(DefaultAccountAdapter):
    def save_user(self, request, user, form, commit=True):
        """
        This is called when a new user signs up.
        We override this to catch IntegrityError if a user with this email
        already exists, and raise a ValidationError instead.
        This provides a better error message to the frontend.
        """
        try:
            user = super().save_user(request, user, form, commit)
        except IntegrityError:
            raise ValidationError({"email": "A user with this email already exists."})
        return user