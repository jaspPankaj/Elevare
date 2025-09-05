import os
import pickle
from .model_registry import ModelBundle, set_model

def load_model():
    # Get absolute path to this directory (backend/aiApp)
    app_dir = os.path.dirname(__file__)
    model_path = os.path.join(app_dir, "model.pkl")   # <-- correct filename

    with open(model_path, "rb") as f:
        pipeline = pickle.load(f)

    bundle = ModelBundle(
        pipeline=pipeline,
        input_columns=["col1", "col2"],  # adjust based on your model
        target_classes=["class1", "class2"],  # adjust based on your model
        raw_obj=pipeline,
    )
    set_model(bundle)
