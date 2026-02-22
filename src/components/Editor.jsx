import { useState, useRef } from "react";

export default function Editor({ addLog }) {
  const [content, setContent] = useState("");
  const editorRef = useRef(null);

  const logEvent = (e) => {
    addLog(
      `Type: ${e.type} | Key: ${e.key || ""} | Code: ${
        e.code || ""
      } | Ctrl: ${e.ctrlKey} | Meta: ${e.metaKey}`
    );
  };

  return (
    <textarea
      ref={editorRef}
      data-test-id="editor-input"
      role="textbox"
      aria-multiline="true"
      value={content}
      onChange={(e) => setContent(e.target.value)}
      onKeyDown={logEvent}
      onKeyUp={logEvent}
      onInput={logEvent}
      onCompositionStart={logEvent}
      onCompositionUpdate={logEvent}
      onCompositionEnd={logEvent}
      style={{
        width: "100%",
        height: "100%",
        fontFamily: "monospace",
        fontSize: "14px",
      }}
    />
  );
}