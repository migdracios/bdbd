from django.urls import path
from session_manage.views import index

urlpatterns = [
    path('', index, name='index'),
]
