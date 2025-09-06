from django.db import models
from organizations.models import WarehouseBusiness
from agencies.models import StaffingAgency
from django.utils.translation import gettext_lazy as _


WORKER_POSITION = [
    ('forklift_operator', 'Forklift Operator'),
    ('warehouse_associate', 'Warehouse Associate'),
    ('material_handler', 'Material Handler')
]

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
    

class Skill(models.Model):
    skill_name = models.CharField(max_length=255)
    abreviation = models.CharField(max_length=10, null=True, blank=True)
    base_color = models.CharField(max_length=7, null=True, blank=True, default='gray')
    description = models.TextField(null=True, blank=True)
    

    def __str__(self):
        return self.skill_name
    
    class Meta:
        verbose_name = _('Skill')
        verbose_name_plural = _('Skills')
        

class WorkerSkill(models.Model):
    worker = models.ForeignKey(
        ContractWorker, 
        on_delete=models.CASCADE, 
        related_name='worker_skills', 
        verbose_name=_('Worker')
        )
    skill = models.ForeignKey(
        Skill, 
        on_delete=models.CASCADE, 
        related_name='worker_skills', 
        verbose_name=_('Skill')
        )
    certification_date = models.DateField(null=True, blank=True)
    expiration_date = models.DateField(null=True, blank=True)
    is_active = models.BooleanField(default=True)
    level = models.IntegerField(null=True, blank=True, default=1)
    
    def __str__(self):
        return f'{self.skill.skill_name} for {self.worker.first_name}'
    
    class Meta:
        # Prevents a worker from having the same skill more than once
        unique_together = ('worker', 'skill')
        verbose_name = _('Worker Skill')
        verbose_name_plural = _('Worker Skills')
