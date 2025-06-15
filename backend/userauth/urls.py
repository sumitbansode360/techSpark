from django.urls import path
from .views import UserRegistrationView, whoami

urlpatterns = [
    path('register/', UserRegistrationView.as_view()),
    path('whoami/', whoami)
]
