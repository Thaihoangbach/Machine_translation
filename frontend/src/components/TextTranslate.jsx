import { useState } from "react";
import api from "../api";

function TextTranslate() {
  const [inputText, setInputText] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    try {
      setLoading(true);

      const res = await api.post("/translate-text", {
        text: inputText,
        mode: mode
      });

      setOutput(res.data.translation);
    } catch (err) {
      console.error(err);
      setOutput("Lỗi khi gọi backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Dịch văn bản</h2>

      <textarea
        rows={5}
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />

      <br />

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? "Đang dịch..." : "Dịch"}
      </button>

      <h3>Kết quả</h3>
      <textarea rows={5} value={output} readOnly />
    </div>
  );
}

export default TextTranslate;
