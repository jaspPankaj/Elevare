
from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password2=serializers.CharField(write_only = True)
    class Meta:
        model = User
        fields = ["name","email","password","password2"]
        extra_kwargs = {"password": {"write_only": True}}

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email is already in use")
        return value    

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError({"password": "Passwords must match"})
        return data

    
    def create(self, validated_data):
        validated_data.pop('password2', None)
        user = User.objects.create_user(
            name=validated_data["name"],
            email = validated_data["email"],
            password = validated_data["password"],
        )
        return user