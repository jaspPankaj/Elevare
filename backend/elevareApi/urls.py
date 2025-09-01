from django.urls import path
from .views import predict_career

urlpatterns = [
    path("predict-career/", predict_career),
]