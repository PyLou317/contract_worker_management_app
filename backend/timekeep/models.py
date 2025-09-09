from django.db import models
from workers.models import ContractWorker
from django.utils.translation import gettext_lazy as _

# Create your models here.
class TimeKeeping(models.Model):
    worker = models.ForeignKey(
        ContractWorker,
        on_delete=models.CASCADE,
        related_name='time_keeping',
        verbose_name=_('worker')
    )
    clock_in = models.TimeField(_("Clock In"), auto_now_add=True)
    clock_out = models.TimeField(_("Clock Out"), auto_now_add=True)
    
    def __str__(self):
        return f'{self.worker}, clocked in at {self.clock_in}, clocked out at {self.clock_out}'