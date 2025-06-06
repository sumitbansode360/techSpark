from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer
from django.contrib.auth.models import User

class UserRegistrationView(CreateAPIView):

    serializer_class = UserSerializer
    queryset = User.objects.all()
