import { useState } from "react";
import api from "./api";
import "./App.css";

export default function App() {
  const [tab, setTab] = useState("text");

  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [mode, setMode] = useState("normal");

  const [file, setFile] = useState(null);
  const [fileResult, setFileResult] = useState("");

  // ===== TEXT TRANSLATION =====
  const translateText = async () => {
    try {
      const res = await api.post("/translate-text", {
        text: inputText,
        mode: mode,
      });
      setOutputText(res.data.translation);
    } catch (err) {
      setOutputText("Lỗi khi gọi backend");
    }
  };

  // ===== FILE TRANSLATION =====
  const translateFile = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    try {
      const res = await api.post("/translate-file", formData);
      setFileResult(res.data.translation);
    } catch (err) {
      setFileResult("Lỗi khi dịch file");
    }
  };

  return (
    <div className="container">
      <h1>Machine Translation Chatbot</h1>
      <p className="subtitle">Translate text & documents (EN → VI)</p>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={tab === "text" ? "tab active" : "tab"}
          onClick={() => setTab("text")}
        >
          Dịch văn bản
        </button>
        <button
          className={tab === "file" ? "tab active" : "tab"}
          onClick={() => setTab("file")}
        >
          Dịch file
        </button>
      </div>

      {/* ===== TEXT TAB ===== */}
      {tab === "text" && (
        <div className="card">
          <div className="row">
            <label>Chế độ dịch</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="normal">Bình thường</option>
              <option value="academic">Học thuật</option>
              <option value="chat">Giao tiếp</option>
            </select>
          </div>

          <div className="grid">
            <textarea
              placeholder="Nhập văn bản tiếng Anh..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
            />
            <textarea
              placeholder="Kết quả dịch tiếng Việt..."
              value={outputText}
              readOnly
            />
          </div>

          <button className="btn-primary" onClick={translateText}>
            Dịch ngay
          </button>
        </div>
      )}

      {/* ===== FILE TAB ===== */}
      {tab === "file" && (
        <div className="card">
          <h3>📄 Dịch file (.txt, .pdf)</h3>

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <div className="row">
            <label>Chế độ dịch</label>
            <select value={mode} onChange={(e) => setMode(e.target.value)}>
              <option value="normal">Bình thường</option>
              <option value="academic">Học thuật</option>
            </select>
          </div>

          <button className="btn-primary" onClick={translateFile}>
            Dịch file
          </button>

          <textarea
            placeholder="Kết quả dịch từ file..."
            value={fileResult}
            readOnly
          />
        </div>
      )}
    </div>
  );
}
