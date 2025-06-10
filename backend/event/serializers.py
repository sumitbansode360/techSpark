from rest_framework.serializers import ModelSerializer
from .models import Event, ImageGallery
from rest_framework.serializers import SerializerMethodField
from rest_framework import serializers

class ImageGallerySerializer(ModelSerializer):
    class Meta:
        model = ImageGallery
        fields = ['id', 'image']

class EventSerializer(ModelSerializer):

    images = ImageGallerySerializer(many=True, read_only=True)

    uploaded_images = serializers.ListField(
        child = serializers.FileField(max_length = 1000000, allow_empty_file = False, use_url = False),
        write_only = True
    )
    

    class Meta:
        model = Event 
        fields = ['id', 'name', 'description', 'location', 'date', 'price', 'thumbnail', 'capacity', 'author', 'images',  'uploaded_images']
        read_only_fields = ['author']

    def create(self, validated_data):
        uploaded_data = validated_data.pop('uploaded_images')
        new_event = Event.objects.create(**validated_data)
        for uploaded_item in uploaded_data:
            ImageGallery.objects.create(event = new_event, image = uploaded_item)
        return new_event