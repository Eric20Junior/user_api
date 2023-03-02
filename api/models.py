from django.db import models
from decimal import Decimal
from django.core.validators import MinValueValidator, MaxValueValidator

# Create your models here.
PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]


class User(models.Model):
    firstname = models.CharField(max_length=50)
    lastname = models.CharField(max_length=50)
    participant = models.DecimalField(max_digits=5, decimal_places=2, default=Decimal(0), validators=PERCENTAGE_VALIDATOR)

    def save(self, *args, **kwargs):
        if self.participant:
            self.participant = self.participant / 100
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.firstname } {self.lastname} {self.participant}%'