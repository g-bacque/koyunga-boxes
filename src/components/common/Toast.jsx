import "./Toast.css";

export default function Toast({ isOpen, type = "info", message, onClose }) {
  if (!isOpen || !message) return null;

  return (
    <div className={`toast toast--${type}`}>
      <div className="toast-content">
        <p className="toast-message">{message}</p>
        <button type="button" className="toast-close" onClick={onClose}>
          ×
        </button>
      </div>
    </div>
  );
}