from django.shortcuts import render
from django.contrib.auth import get_user_model

from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import Transaction, Arena
from .serializer import TransactionSerializer, ArenaSerializer
# Create your views here.

User = get_user_model()

@api_view(['GET', 'POST'])
def transactionList(request):
    if request.method == 'GET':
        user = request.user 
        queryset = Transaction.objects.all()
        if not user.is_superuser:
            queryset = queryset.filter(user_id=user)
        queryset = queryset.order_by('-date')
        serializer = TransactionSerializer(queryset, many=True)

        return Response(serializer.data)

    if request.method == 'POST':
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def arena_list_or_create(request):
    if request.method == 'GET':
        queryset = Arena.objects.all()

        serializer = ArenaSerializer(queryset, many=True)

        return Response(serializer.data)
    
    if request.method == 'POST':
        serializer = ArenaSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
def transaction_detail(request, pk):
    queryset = Transaction.objects.get(pk=pk)

    if request.method == 'GET':
        serializer = TransactionSerializer(queryset)

        return Response(serializer.data)

    if request.method == 'PUT':
        serializer = TransactionSerializer(queryset, data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'DELETE':
        queryset.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def arena_detail(request, pk):
    queryset = Arena.objects.get(pk=pk)
    
    if request.method == 'GET':
        serializer = ArenaSerializer(queryset)

        return Response(serializer.data)

@api_view(['GET'])
def transactionCount(request):
    count = Transaction.objects.count()

    return Response({ 'transactions' : count })

@api_view(['GET'])
def arenaCount(request):
    count = Arena.objects.count()

    return Response({ 'arena': count })

@api_view(['GET'])
def userCount(request):
    count = User.objects.count()

    return Response({ 'user': count })