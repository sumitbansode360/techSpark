from django.db import models
from django.contrib.auth.models import User

class Event(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    date = models.DateTimeField()
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    thumbnail = models.ImageField(upload_to='event_images/', blank=True, null=True)
    capacity = models.PositiveIntegerField(default=0)
    author = models.ForeignKey(User, related_name='events', on_delete=models.CASCADE)

class ImageGallery(models.Model):
    event = models.ForeignKey(Event, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='event_gallery/')

    def __str__(self):
        return f"Image for {self.event.name}"
    
    class Meta:
        verbose_name = "Event Image"
        verbose_name_plural = "Event Images"