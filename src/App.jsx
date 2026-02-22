import { useState } from "react";
import Editor from "./components/Editor";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        data-test-id="editor-container"
        style={{ flex: 1, padding: "10px" }}
      >
        <Editor addLog={addLog} />
      </div>

      <div
        data-test-id="event-dashboard"
        style={{
          width: "40%",
          borderLeft: "1px solid #ccc",
          padding: "10px",
          overflow: "auto",
        }}
      >
        <Dashboard logs={logs} />
      </div>
    </div>
  );
}