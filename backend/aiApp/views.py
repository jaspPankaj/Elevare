from rest_framework.views import APIView
from rest_framework.response import Response
from aiApp.model_registry import get_model

class PredictView(APIView):
    def post(self, request):
        bundle = get_model()
        data = request.data  # your input JSON
        df = ...  # convert data into DataFrame using bundle.input_columns
        preds = bundle.pipeline.predict(df)
        return Response({"predictions": preds.tolist()})
