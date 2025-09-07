from django.urls import path
from .views import Registerview,Loginview,Dashboardview,PredictCareerView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", Registerview.as_view()),
    path("login/",Loginview.as_view()),
    path("dashboard/",Dashboardview.as_view()),
    path('predict/',PredictCareerView.as_view()),

]