from transformers import MarianMTModel, MarianTokenizer
import torch
from backend.file_chunking import chunk_text
from backend.config import MAX_LENGTH

# Load model 1 lần
tokenizer = MarianTokenizer.from_pretrained("Helsinki-NLP/opus-mt-en-vi")
model = MarianMTModel.from_pretrained("Helsinki-NLP/opus-mt-en-vi")


def apply_style_prompt(text: str, mode: str) -> str:
    if mode == "academic":
        return (
            "Academic style:"
            + text
        )
    elif mode == "summary":
        return (
            "Summarize the main ideas:"
            + text
        )
    else:
        return text


def translate_with_helsinki(text: str, mode: str = "normal") -> str:
    styled_text = apply_style_prompt(text, mode)
    chunks = chunk_text(styled_text)

    results = []

    for chunk in chunks:
        inputs = tokenizer(
            chunk,
            return_tensors="pt",
            padding=True,
            truncation=True,
            max_length=MAX_LENGTH
        )

        with torch.no_grad():
            translated = model.generate(**inputs)

        results.append(
            tokenizer.decode(translated[0], skip_special_tokens=True)
        )

    return "\n".join(results)
