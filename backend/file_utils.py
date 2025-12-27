from docx import Document
from PyPDF2 import PdfReader
from io import BytesIO
from PyPDF2 import PdfReader

def read_txt(file_bytes: bytes) -> str:
    return file_bytes.decode("utf-8")

def read_docx(file_bytes: bytes) -> str:
    doc = Document(file_bytes)
    return "\n".join([p.text for p in doc.paragraphs])

from io import BytesIO
from PyPDF2 import PdfReader

def read_pdf(file_bytes: bytes) -> str:
    reader = PdfReader(BytesIO(file_bytes))
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text


