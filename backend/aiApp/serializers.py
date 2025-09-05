# inference/serializers.py
from rest_framework import serializers

class PredictSerializer(serializers.Serializer):
    # Accept either a dict (column_name -> value) or a list/tuple of values (must match detected order)
    features = serializers.JSONField()

    def validate_features(self, value):
        if not isinstance(value, (list, tuple, dict)):
            raise serializers.ValidationError("features must be a list or an object (dict).")
        return value

    def to_dataframe(self, input_columns):
        """
        Returns a pandas.DataFrame with one row and columns input_columns.
        Accepts:
          - {'features': {col1:val, col2:val, ...}}
          - {'features': [v1, v2, ...]}  (order must match input_columns)
        """
        import pandas as pd
        val = self.validated_data["features"]
        if isinstance(val, dict):
            # ensure all required columns are present
            missing = [c for c in input_columns if c not in val]
            if missing:
                raise serializers.ValidationError(f"Missing columns: {missing}")
            row = [val[c] for c in input_columns]
            df = pd.DataFrame([row], columns=input_columns)
            return df
        else:
            # list/tuple
            if len(val) != len(input_columns):
                raise serializers.ValidationError(f"features list length {len(val)} != expected {len(input_columns)}")
            df = pd.DataFrame([list(val)], columns=input_columns)
            return df
