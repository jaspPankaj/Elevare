# inference/model_registry.py
from dataclasses import dataclass
from typing import Any, List, Optional

@dataclass
class ModelBundle:
    pipeline: Any
    input_columns: List[str]
    target_classes: List[str]
    raw_obj: Any = None

MODEL_BUNDLE: Optional[ModelBundle] = None

def set_model(bundle: ModelBundle):
    global MODEL_BUNDLE
    MODEL_BUNDLE = bundle

def get_model() -> ModelBundle:
    if MODEL_BUNDLE is None:
        raise RuntimeError("Model not loaded")
    return MODEL_BUNDLE
