from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Create your views here.
@api_view(["POST"])
def predict_career(request):
    skills = request.data.get("skills", [])
    return Response({
        "input_skills": skills,
        "predicted_career": "Babu ka babu banna hai "  # Temporary until ML added
    })