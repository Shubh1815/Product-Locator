from django.urls import path
from .views import transactionList

urlpatterns = [
    path('', transactionList, name="Transaction-List")
]