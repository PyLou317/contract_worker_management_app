from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
from organizations.models import WarehouseBusiness
from django.utils.translation import gettext_lazy as _


# Create a custom user manager to handle email as the USERNAME_FIELD
class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifier
    for authentication instead of usernames.
    """
    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
    
    
# Create your models here.
class User(AbstractUser):
    first_name=models.CharField(max_length=150)
    last_name=models.CharField(max_length=150)
    phone_number=models.CharField(max_length=15, default='0000000000')
    
    ROLES_CHOICES = (
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('worker', 'Worker'),
    )
    organization = models.ForeignKey(
        WarehouseBusiness,
        on_delete=models.CASCADE,
        related_name='users',
        null=True,
        blank=True
    )
    is_onboarded = models.BooleanField(default=False)
    role = models.CharField(max_length=50, choices=ROLES_CHOICES, default='manager')
    
    # Overriding the email field to make it unique and required
    email = models.EmailField(
        _('email address'),
        unique=True,
        error_messages={
            'unique': _("A user with that email already exists."),
        },
    )
    
    # Remove username field inherited from AbstractUser
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    
    # Point to the new custom manager
    objects = CustomUserManager()

    def __str__(self):
        return self.email
