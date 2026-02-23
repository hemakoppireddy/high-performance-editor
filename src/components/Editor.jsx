import { useRef, useEffect } from "react";
import useHistory from "../hooks/useHistory";

export default function Editor({ addLog }) {
  const editorRef = useRef(null);
  const { content, updateContent, undo, redo, undoStack } = useHistory("");

  const handleInput = (e) => {
    updateContent(e.target.value);
  };

  const handleKeyDown = (e) => {
    const textarea = editorRef.current;
    const isMac = navigator.platform.toUpperCase().includes("MAC");
    const isModifier = isMac ? e.metaKey : e.ctrlKey;

    // ================= SAVE =================
    if (isModifier && e.key.toLowerCase() === "s") {
      e.preventDefault();
      addLog("Action: Save");
      return;
    }

    // ================= UNDO / REDO =================
    if (isModifier && e.key.toLowerCase() === "z") {
      e.preventDefault();
      if (e.shiftKey) {
        redo();
      } else {
        undo();
      }
      return;
    }

    // ================= TOGGLE COMMENT =================
    if (isModifier && e.key === "/") {
      e.preventDefault();

      const start = textarea.selectionStart;
      const value = content;

      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const lineEnd = value.indexOf("\n", start);
      const actualLineEnd = lineEnd === -1 ? value.length : lineEnd;

      const line = value.slice(lineStart, actualLineEnd);

      let newLine;
      if (line.startsWith("// ")) {
        newLine = line.slice(3);
      } else {
        newLine = "// " + line;
      }

      const newValue =
        value.slice(0, lineStart) +
        newLine +
        value.slice(actualLineEnd);

      updateContent(newValue);
      return;
    }

    // ================= TAB / SHIFT+TAB =================
    if (e.key === "Tab") {
      e.preventDefault();

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const value = content;

      const lineStart = value.lastIndexOf("\n", start - 1) + 1;

      if (e.shiftKey) {
        // OUTDENT
        if (value.slice(lineStart, lineStart + 2) === "  ") {
          const newValue =
            value.slice(0, lineStart) +
            value.slice(lineStart + 2);

          updateContent(newValue);

          setTimeout(() => {
            textarea.selectionStart = start - 2;
            textarea.selectionEnd = end - 2;
          }, 0);
        }
      } else {
        // INDENT
        const newValue =
          value.slice(0, lineStart) +
          "  " +
          value.slice(lineStart);

        updateContent(newValue);

        setTimeout(() => {
          textarea.selectionStart = start + 2;
          textarea.selectionEnd = end + 2;
        }, 0);
      }
      return;
    }

    // ================= SMART ENTER =================
    if (e.key === "Enter") {
      e.preventDefault();

      const start = textarea.selectionStart;
      const value = content;

      const lineStart = value.lastIndexOf("\n", start - 1) + 1;
      const currentLine = value.slice(lineStart, start);

      const indentationMatch = currentLine.match(/^(\s+)/);
      const indentation = indentationMatch ? indentationMatch[0] : "";

      const newValue =
        value.slice(0, start) +
        "\n" +
        indentation +
        value.slice(start);

      updateContent(newValue);

      setTimeout(() => {
        const newCursor = start + 1 + indentation.length;
        textarea.selectionStart = newCursor;
        textarea.selectionEnd = newCursor;
      }, 0);

      return;
    }

    // ================= DEFAULT LOG =================
    addLog(`Type: ${e.type} | Key: ${e.key}`);
  };

  useEffect(() => {
    window.getEditorState = () => ({
      content,
      historySize: undoStack.length,
    });
  }, [content, undoStack]);

  return (
    <textarea
      ref={editorRef}
      data-test-id="editor-input"
      role="textbox"
      aria-multiline="true"
      value={content}
      onInput={handleInput}
      onKeyDown={handleKeyDown}
      style={{
  flex: 1,
  width: "100%",
  resize: "none",
  backgroundColor: "#1e1e1e",
  color: "#d4d4d4",
  border: "none",
  outline: "none",
  padding: "16px",
  fontSize: "14px",
  lineHeight: "1.6",
  fontFamily: "Fira Code, monospace",
}}
    />
  );
}