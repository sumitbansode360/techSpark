from django.contrib import admin
from .models import Event, ImageGallery

class EventImageGalleryInline(admin.TabularInline):
    model = ImageGallery
    extra = 1
    

class ProductAdmin(admin.ModelAdmin):
    search_fields = ('title',)
    inlines = [EventImageGalleryInline]

admin.site.register(Event, ProductAdmin)
admin.site.register(ImageGallery)