export default function Dashboard({ logs }) {
  return (
    <div data-test-id="event-log-list">
      {logs.map((log, index) => (
        <div key={index} data-test-id="event-log-entry">
          {log}
        </div>
      ))}
    </div>
  );
}