def chunk_text(text: str, max_chars: int = 800):
    """
    Chia text thành các đoạn nhỏ dựa trên số ký tự
    (an toàn hơn token-level cho sinh viên)
    """
    chunks = []
    current = ""

    for paragraph in text.split("\n"):
        if len(current) + len(paragraph) <= max_chars:
            current += paragraph + "\n"
        else:
            chunks.append(current.strip())
            current = paragraph + "\n"

    if current.strip():
        chunks.append(current.strip())

    return chunks
