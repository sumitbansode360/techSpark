from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import EventSerializer
from .models import Event
from .permissions import IsAuthorOrReadOnly

class EventViewSet(ModelViewSet):

    serializer_class = EventSerializer
    queryset = Event.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
    
    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]
        elif self.action == 'retrieve':
            return [IsAuthenticated()]
        elif self.action == 'create':
            return [IsAuthenticated()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsAuthorOrReadOnly()]
        
        return [IsAuthenticated()]
