from django.urls import path
from . import views

urlpatterns = [
    path('webhook/', views.webhook, name='telegram_webhook'),
    path('', views.index, name='index'),  # URL для мини-приложения
]
