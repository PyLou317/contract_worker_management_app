from django.db import models
from organizations.models import WarehouseBusiness


# Create your models here.
class ContractWorker(models.Model):
    first_name = models.CharField(max_length=125)
    last_name = models.CharField(max_length=125)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20)
    employer = models.ForeignKey(WarehouseBusiness, on_delete=models.CASCADE)

    
    def __str__(self):
        return f'{self.last_name}, {self.first_name}'