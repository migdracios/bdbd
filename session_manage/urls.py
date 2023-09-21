from django.urls import path
from . import views

app_name = 'session_manage'

urlpatterns = [
    path('', views.index, name='index'),
]
