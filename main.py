from fastapi import FastAPI
from pydantic import BaseModel
from backend.translation import translate_with_helsinki
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, UploadFile, File, Form
from backend.translation import translate_with_helsinki
from backend.file_utils import read_txt, read_docx, read_pdf
from backend.translation import translate_with_helsinki

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class TranslateRequest(BaseModel):
    text: str

@app.post("/translate-text")
def translate_text(req: dict):
    text = req["text"]
    mode = req.get("mode", "normal")
    translated = translate_with_helsinki(text,mode)
    return {"translation": translated}



@app.post("/translate-file")
async def translate_file(
    file: UploadFile = File(...),
    mode: str = Form("normal")
):
    content = await file.read()

    if file.filename.endswith(".pdf"):
        text = read_pdf(content)
    elif file.filename.endswith(".docx"):
        text = read_docx(content)
    else:
        return {"error": "Unsupported file type"}

    translated = translate_with_helsinki(text, mode)

    return {"translation": translated}

