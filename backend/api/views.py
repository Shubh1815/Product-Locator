from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Transaction, Arena
from .serializer import TransactionSerializer
# Create your views here.


@api_view(['GET'])
def transactionList(request):
    if request.method == 'GET':
        queryset = Transaction.objects.all().order_by('-date')
        serializer = TransactionSerializer(queryset, many=True)

        return Response(serializer.data)