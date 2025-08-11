from django.db import models
from django.utils.translation import gettext_lazy as _
from workers.models import ContractWorker
from users.models import User


class Rating(models.Model):
    """
    Represents a single evaluation for a worker by a manager.
    """
    worker = models.ForeignKey(
        ContractWorker,
        on_delete=models.CASCADE,
        related_name='ratings',
        verbose_name=_('worker')
    )
    
    manager = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='given_ratings',
        verbose_name=_('manager')
    )
    
    class RatingChoices(models.IntegerChoices):
        EXCELLENT = 5, _('Excellent')
        GOOD = 4, _('Good')
        AVERAGE = 3, _('Average')
        BELOW_AVERAGE = 2, _('Below Average')
        POOR = 1, _('Poor')
    
    attendance_score = models.IntegerField(
        choices=RatingChoices.choices,
        verbose_name=_('attendance')
    )
    performance_score = models.IntegerField(
        choices=RatingChoices.choices,
        verbose_name=_('performance')
    )
    communication_score = models.IntegerField(
        choices=RatingChoices.choices,
        verbose_name=_('communication')
    )
    skills_score = models.IntegerField(
        choices=RatingChoices.choices,
        verbose_name=_('skills')
    )
    
    comment = models.TextField(blank=True, verbose_name=_('comment'))
    created_at = models.DateTimeField(auto_now_add=True, verbose_name=_('created at'))

    def __str__(self):
        return f"Rating for {self.worker} by {self.manager}"
        
    def get_average_score(self):
        """
        Calculates the average score for the worker based on this rating.
        """
        scores = [
            self.attendance_score,
            self.performance_score,
            self.communication_score,
            self.skills_score
        ]
        
        return sum(scores) / len(scores) if scores else 0
    
    
    class Meta:
        verbose_name = _('Rating')
        verbose_name_plural = _('Ratings')
        ordering = ['-created_at']
        unique_together = ['worker', 'manager']
        
    
    average_score = property(get_average_score)
    
    