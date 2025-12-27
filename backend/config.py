import os

MODEL_NAME = os.getenv(
    "MT_MODEL",
    "Helsinki-NLP/opus-mt-en-vi"
)

DEVICE = "cuda" if os.getenv("USE_GPU") == "1" else "cpu"
MAX_LENGTH = 512
