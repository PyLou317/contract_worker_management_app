from django.db import models
from organizations.models import WarehouseBusiness
from agencies.models import StaffingAgency


WORKER_POSITION = [
    ('forklift_operator', 'Forklift Operator'),
    ('warehouse_associate', 'Warehouse Associate'),
    ('material_handler', 'Material Handler')
]

# Create your models here.
class ContractWorker(models.Model):
    first_name = models.CharField(max_length=125)
    last_name = models.CharField(max_length=125)
    email = models.EmailField(max_length=255, unique=True)
    phone_number = models.CharField(max_length=20)
    current_contract = models.ForeignKey(WarehouseBusiness, on_delete=models.CASCADE)
    agency = models.ForeignKey(StaffingAgency, on_delete=models.CASCADE)
    position = models.CharField(max_length=125, choices=WORKER_POSITION, default='Warehouse Associate')
    
    def __str__(self):
        return f'{self.last_name}, {self.first_name}'