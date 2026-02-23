export default function Dashboard({ logs }) {
  return (
    <div
      data-test-id="event-log-list"
      className="dashboard-content"
    >
      {logs.map((log, index) => (
        <div
          key={index}
          data-test-id="event-log-entry"
          className="log-entry"
        >
          {log}
        </div>
      ))}
    </div>
  );
}