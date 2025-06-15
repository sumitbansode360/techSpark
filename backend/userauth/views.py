from rest_framework.generics import CreateAPIView
from .serializers import UserSerializer
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response

class UserRegistrationView(CreateAPIView):

    serializer_class = UserSerializer
    queryset = User.objects.all()

@api_view(["GET"])
def whoami(request):
    return Response({"id":request.user.id, "logged_in_user":request.user.username})