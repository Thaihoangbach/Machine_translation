# 🌐 Machine Translation — English → Vietnamese

Ứng dụng dịch máy tiếng Anh sang tiếng Việt, sử dụng mô hình **Helsinki-NLP/opus-mt-en-vi** từ Hugging Face. Hỗ trợ dịch văn bản thuần và dịch file (PDF, DOCX).

---

## 📁 Cấu trúc dự án

```
Machine_translation-main/
├── main.py                  # FastAPI app, định nghĩa các API endpoint
├── requirement.txt          # Các thư viện Python cần cài
├── backend/
│   ├── config.py            # Cấu hình model, thiết bị (CPU/GPU), max length
│   ├── translation.py       # Load model Helsinki-NLP, logic dịch theo chunk
│   ├── file_chunking.py     # Chia văn bản dài thành các đoạn nhỏ
│   ├── file_handler.py      # Đọc nội dung file TXT, DOCX, PDF (async)
│   └── file_utils.py        # Đọc nội dung file (bytes) — DOCX, PDF
└── frontend/
    ├── index.html
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx          # Giao diện chính: 2 tab (dịch văn bản / dịch file)
        ├── api.js           # Axios instance trỏ về backend
        └── components/
            ├── TextTranslate.jsx   # Component dịch văn bản
            └── FileTranslate.jsx  # Component dịch file
```

---

## 🚀 Hướng dẫn cài đặt & chạy

### Yêu cầu hệ thống

- Python ≥ 3.10
- Node.js ≥ 18
- (Tùy chọn) GPU với CUDA để tăng tốc dịch

---

### 1. Cài đặt Backend

```bash
# Tạo môi trường ảo (khuyến nghị)
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate

# Cài các thư viện
pip install -r requirement.txt
pip install transformers torch PyPDF2
```

> **Lần đầu chạy**, model `Helsinki-NLP/opus-mt-en-vi` sẽ được tự động tải về từ Hugging Face (~300 MB).

### 2. Chạy Backend

```bash
uvicorn main:app --reload
```

Backend sẽ chạy tại: `http://127.0.0.1:8000`

---

### 3. Cài đặt & Chạy Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend sẽ mở tự động tại: `http://localhost:5173`

---

## 🔌 API Endpoints

### `POST /translate-text`

Dịch một đoạn văn bản.

**Request body (JSON):**
```json
{
  "text": "Hello, how are you?",
  "mode": "normal"
}
```

**Response:**
```json
{
  "translation": "Xin chào, bạn có khỏe không?"
}
```

---

### `POST /translate-file`

Dịch nội dung từ file PDF hoặc DOCX.

**Form data:**
- `file`: File cần dịch (`.pdf` hoặc `.docx`)
- `mode`: Chế độ dịch (`normal`, `academic`)

**Response:**
```json
{
  "translation": "Nội dung đã được dịch sang tiếng Việt..."
}
```

---

## 🎛️ Chế độ dịch (Translation Modes)

| Mode       | Mô tả                                              |
|------------|----------------------------------------------------|
| `normal`   | Dịch thông thường, trực tiếp                       |
| `academic` | Thêm prompt "Academic style:" trước khi dịch       |
| `summary`  | Thêm prompt "Summarize the main ideas:" trước khi dịch |

---

## ⚙️ Cấu hình

Các thông số có thể tuỳ chỉnh qua biến môi trường trong `backend/config.py`:

| Biến môi trường | Giá trị mặc định             | Mô tả                        |
|-----------------|------------------------------|------------------------------|
| `MT_MODEL`      | `Helsinki-NLP/opus-mt-en-vi` | Tên model Hugging Face       |
| `USE_GPU`       | `0` (CPU)                    | Đặt `1` để dùng GPU/CUDA     |

Ví dụ chạy với GPU:
```bash
USE_GPU=1 uvicorn main:app --reload
```

---

## 📦 Công nghệ sử dụng

**Backend:**
- [FastAPI](https://fastapi.tiangolo.com/) — Web framework
- [Hugging Face Transformers](https://huggingface.co/Helsinki-NLP/opus-mt-en-vi) — Mô hình dịch máy MarianMT
- [PyMuPDF (fitz)](https://pymupdf.readthedocs.io/) — Đọc file PDF
- [python-docx](https://python-docx.readthedocs.io/) — Đọc file DOCX
- [PyPDF2](https://pypdf2.readthedocs.io/) — Đọc file PDF (utils)

**Frontend:**
- [React 19](https://react.dev/) + [Vite](https://vite.dev/)
- [Axios](https://axios-http.com/) — Gọi API

---

## 📝 Ghi chú

- Văn bản dài sẽ được tự động chia thành các đoạn tối đa **800 ký tự** trước khi dịch, giúp tránh lỗi vượt quá giới hạn token của model.
- Model chỉ hỗ trợ dịch **tiếng Anh → tiếng Việt**.
- File upload hỗ trợ định dạng: `.pdf`, `.docx`.
