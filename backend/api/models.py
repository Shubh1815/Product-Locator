from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Arena(models.Model):
    location_id = models.CharField(max_length=100, primary_key=True)
    rows = models.IntegerField()
    cols = models.IntegerField()

    def __str__(self):
        return self.location_id

class Transaction(models.Model):
    product_id = models.CharField(max_length=100, primary_key=True)
    location_id = models.ForeignKey(Arena, on_delete=models.CASCADE, related_name='products')
    user_id = models.ForeignKey(User, on_delete=models.CASCADE)

    row = models.IntegerField(null=True)
    col = models.IntegerField(null=True)

    date = models.DateField(auto_now_add=True)

    class Meta:
        unique_together = (('location_id', 'row', 'col'),)

    def __str__(self):
        return self.product_id