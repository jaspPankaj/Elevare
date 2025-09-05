from django.apps import AppConfig

class AiappConfig(AppConfig):
    default_auto_field = "django.db.models.BigAutoField"
    name = "aiApp"

    def ready(self):
        from aiApp.load_model import load_model
        load_model()
