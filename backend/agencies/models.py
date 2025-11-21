from django.db import models

# Create your models here.
class StaffingAgency(models.Model):
    name = models.CharField(max_length=255, unique=True)
    contact_first_name = models.CharField(max_length=150, null=True, blank=True)
    contact_last_name = models.CharField(max_length=150, null=True, blank=True)
    contact_email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    address = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100, blank=True, null=True)
    province = models.CharField(max_length=100, blank=True, null=True)
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    def __str__(self):
        return self.name