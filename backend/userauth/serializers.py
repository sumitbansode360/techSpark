from rest_framework.serializers import ModelSerializer
from django.contrib.auth.models import User
from rest_framework import serializers

#new user 
class UserSerializer(ModelSerializer):

    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'password1', 'password2']

    def validate(self, data):

        if data['password1'] != data['password2']:
            raise serializers.ValidationError("Passwords do not match")
        if len(data['password1']) < 8:
            raise serializers.ValidationError("Password must be at least 8 characters long")
        return data

    def create(self, validated_data):
        user = User.objects.create(
            username = validated_data['username'],
            email = validated_data['email'],
            first_name = validated_data['first_name'],
            last_name = validated_data['last_name']
        )
        user.set_password(validated_data['password1'])
        user.save()
        return user
    
