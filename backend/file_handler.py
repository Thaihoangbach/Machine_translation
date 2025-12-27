import docx
import fitz  # PyMuPDF

async def extract_text(file):
    text = ""

    if file.filename.endswith(".txt"):
        # TXT
        text = (await file.read()).decode("utf-8")

    elif file.filename.endswith(".docx"):
        # DOCX
        doc = docx.Document(file.file)
        text = "\n".join([p.text for p in doc.paragraphs])

    elif file.filename.endswith(".pdf"):
        # PDF
        pdf = fitz.open(stream=await file.read(), filetype="pdf")
        for page in pdf:
            text += page.get_text()

    else:
        raise ValueError("Unsupported file format. Only txt, docx, pdf are supported.")

    return text
