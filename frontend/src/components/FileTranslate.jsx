import { useState } from "react";
import api from "../api";

function FileTranslate() {
  const [file, setFile] = useState(null);
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) return alert("Chọn file trước");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("mode", mode);

    try {
      setLoading(true);

      const res = await api.post("/translate-file", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      setOutput(res.data.translation);
    } catch (err) {
      console.error(err);
      setOutput("Lỗi khi dịch file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Dịch file</h2>

      <input
        type="file"
        accept=".txt,.pdf,.docx"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <br /><br />

      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Đang dịch..." : "Dịch file"}
      </button>

      <h3>Kết quả</h3>
      <textarea rows={10} value={output} readOnly />
    </div>
  );
}

export default FileTranslate;
