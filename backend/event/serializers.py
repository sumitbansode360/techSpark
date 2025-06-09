from rest_framework.serializers import ModelSerializer
from .models import Event, ImageGallery
from rest_framework.serializers import SerializerMethodField


class ImageGallerySerializer(ModelSerializer):
    class Meta:
        model = ImageGallery
        fields = ['id', 'image']

class EventSerializer(ModelSerializer):

    gallary = SerializerMethodField()

    class Meta:
        model = Event 
        fields = ['id', 'name', 'description', 'location', 'date', 'price', 'thumbnail', 'capacity', 'gallary', 'author']
        read_only_fields = ['author']

    def get_gallary(self, obj):
        image = obj.images.all()
        return ImageGallerySerializer(image, many=True).data

