from rest_framework import serializers
from .models import Transaction, Arena

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ('product_id', 'location_id', 'user_id', 'date')
