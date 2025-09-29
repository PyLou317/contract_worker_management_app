from django.db import models
from django.utils.translation import gettext_lazy as _
from users.models import User
from organizations.models import WarehouseBusiness
from workers.models import ContractWorker


class Area(models.Model):
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True, null=True)
    organization = models.ForeignKey(
        'organizations.WarehouseBusiness', 
        on_delete=models.CASCADE, 
        related_name='areas',
        null=False,
        blank=False
    )

    def __str__(self):
        return f'{self.organization.name} - {self.name}'

    class Meta:
        verbose_name = _('Area')
        verbose_name_plural = _('Areas')
        ordering = ['name']
        unique_together = ('name', 'organization')
        

class Manager(models.Model):
    name = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    organization = models.ForeignKey(
        'organizations.WarehouseBusiness', 
        on_delete=models.CASCADE, 
        related_name='managers',
        null=False, 
        blank=False
    )

    def __str__(self):
        return self.name

    class Meta:
        verbose_name = _('Manager')
        verbose_name_plural = _('Managers')
        ordering = ['name']
        unique_together = ('email', 'organization',) 
        

class Schedule(models.Model):
    """
    Represents a weekly or bi-weekly work schedule for a specific organization.
    This model acts as a container for individual shifts.
    """
    # Link the schedule to a specific organization
    organization = models.ForeignKey(
        WarehouseBusiness,
        on_delete=models.CASCADE,
        related_name='schedules',
        verbose_name=_('organization')
    )

    manager = models.ForeignKey(
        Manager,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='created_schedules',
        verbose_name=_('manager')
    )
    
    area = models.ForeignKey(
        Area,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='schedules',
        verbose_name=_('area')
    )

    # The date range for the schedule
    start_date = models.DateField(_('start date'))
    end_date = models.DateField(_('end date'))

    # A flag to control visibility for workers
    is_published = models.BooleanField(default=False, verbose_name=_('is published'))

    def __str__(self):
        return f"Schedule for {self.organization.name} from {self.start_date} to {self.end_date}"

    class Meta:
        verbose_name = _('Schedule')
        verbose_name_plural = _('Schedules')
        ordering = ['-start_date']


class Shift(models.Model):
    """
    Represents a single shift within a larger schedule.
    This connects a specific user to a time slot and a job position.
    """
    # Link the shift to a parent schedule
    schedule = models.ForeignKey(
        Schedule,
        on_delete=models.CASCADE,
        related_name='shifts',
        verbose_name=_('schedule')
    )

    # The user assigned to this shift
    contract_worker = models.ManyToManyField(
        ContractWorker,
        related_name='shifts',
        verbose_name=_('worker')
    )

    # The start and end times for the shift
    start_time = models.DateTimeField(_('start time'))
    end_time = models.DateTimeField(_('end time'))

    # The position or role for this shift (e.g., 'Forklift Driver')
    # position = models.CharField(max_length=100, verbose_name=_('position'))

    def __str__(self):
        return f"{self.contract_worker} ({self.start_time.strftime('%Y-%m-%d %H:%M')})"

    class Meta:
        verbose_name = _('Shift')
        verbose_name_plural = _('Shifts')
        ordering = ['start_time']
