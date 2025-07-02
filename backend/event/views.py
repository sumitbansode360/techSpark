from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from .serializers import EventSerializer, BookingSerializer
from .models import Event, Booking
from .permissions import IsAuthorOrReadOnly
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework import status

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

class BookEventView(CreateAPIView):

    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, event_id):
        try:
            event = Event.objects.get(id=event_id)
        except Event.DoesNotExist:
            return Response({"error": "Event does not exist!"}, status=status.HTTP_404_NOT_FOUND)
        
        current_bookings = Booking.objects.filter(event=event).count()

        if current_bookings >= event.capacity:
            return Response({"error": "Booking full for this event!"}, status=status.HTTP_400_BAD_REQUEST)
        
        booking = Booking.objects.create(event=event, user=request.user)
        serializer = self.get_serializer(booking)
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)

#booking history 
class BookedHistory(ListAPIView):
    def get(self, request):
        bookings = Booking.objects.filter(user=request.user).order_by('-booked_at')
        if not bookings.exists():
            return Response({"error": "no booking found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BookingSerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK) 