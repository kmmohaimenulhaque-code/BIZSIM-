export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export function Spinner() {
  return <div className="spinner" aria-label="Loading" />;
}

export function Empty({ title, body }) {
  return (
    <div className="empty">
      <h3>{title}</h3>
      {body && <p className="muted">{body}</p>}
    </div>
  );
}
