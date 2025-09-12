from django.urls import path
from .views import RegisterView,LoginView,DashboardView,UserView,LogoutView
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("login/",LoginView.as_view()),
    path("dashboard/",DashboardView.as_view()),
    path("user/",UserView.as_view()),
    path("logout/",LogoutView.as_view())

]