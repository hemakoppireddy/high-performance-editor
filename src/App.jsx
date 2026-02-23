import { useState } from "react";
import Editor from "./components/Editor";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prev) => [...prev, message]);
  };

  return (
    <div className="app-container">
      <div
        data-test-id="editor-container"
        className="editor-panel"
      >
        <div className="panel-header">Editor</div>
        <Editor addLog={addLog} />
      </div>

      <div
        data-test-id="event-dashboard"
        className="dashboard-panel"
      >
        <div className="panel-header">Event Dashboard</div>
        <Dashboard logs={logs} />
      </div>
    </div>
  );
}