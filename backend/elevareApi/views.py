from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions

from .serializers import RegisterSerializer
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAuthenticated

from .models import User

class Registerview(APIView):

    def post(self, request):
        data = request.data
        serializer = RegisterSerializer(data = data)
        if serializer.is_valid():
            user = serializer.save()
            return Response ({
                "message" : "User Create Successfully",
                "status" : True,
                "data" : serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response (serializer.errors,status=status.HTTP_400_BAD_REQUEST)
    
class Loginview(APIView):
    def post(self, request):
        data = request.data
        email = data.get("email")
        password = data.get("password")

        user = User.objects.filter(email = email).first()
        if user and user.check_password(password):
            refresh= RefreshToken.for_user(user)
            return Response({
                "access_token" : str(refresh.access_token),
                "refresh_token" :str(refresh)
            })
        return Response ({"message": "Invalid Credentials"},status=status.HTTP_400_BAD_REQUEST)
    
class Dashboardview(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        user = request.user
        serializer = RegisterSerializer(user)
        return Response(serializer.data)
    