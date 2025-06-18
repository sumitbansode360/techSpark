from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import EventViewSet, BookEventView, BookedHistory

router = DefaultRouter()
router.register(r'', EventViewSet, basename='event')

urlpatterns = [
    path('<int:event_id>/book/', BookEventView.as_view()),
    path('book/history/', BookedHistory.as_view()),
] + router.urls
