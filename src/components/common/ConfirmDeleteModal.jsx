import { useEffect, useMemo, useState } from "react";
import "./ConfirmDeleteModal.css";

export default function ConfirmDeleteModal({
  isOpen,
  title,
  message,
  expectedValue,
  inputLabel,
  confirmButtonText = "Eliminar",
  cancelButtonText = "Cancelar",
  onCancel,
  onConfirm,
}) {
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (isOpen) {
      setInputValue("");
    }
  }, [isOpen]);

  const normalizedInput = useMemo(() => inputValue.trim(), [inputValue]);
  const normalizedExpected = useMemo(
    () => String(expectedValue || "").trim(),
    [expectedValue]
  );

  const isMatch = normalizedInput === normalizedExpected;

  if (!isOpen) return null;

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onCancel();
    }
  };

  const handleConfirmClick = (event) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("MODAL BUTTON CLICK");
    console.log("normalizedInput:", normalizedInput);
    console.log("normalizedExpected:", normalizedExpected);
    console.log("isMatch:", isMatch);

    if (!isMatch) return;

    onConfirm();
  };

  return (
    <div className="confirm-delete-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="confirm-delete-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="confirm-delete-modal-header">
          <h2 className="confirm-delete-modal-title">{title}</h2>
          <p className="confirm-delete-modal-message">{message}</p>
        </div>

        <div className="confirm-delete-modal-form">
          <label
            className="confirm-delete-modal-label"
            htmlFor="confirm-delete-input"
          >
            {inputLabel}
          </label>

          <input
            id="confirm-delete-input"
            type="text"
            className="confirm-delete-modal-input"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            autoFocus
          />

          <p className="confirm-delete-modal-helper">
            Escribe exactamente: <strong>{normalizedExpected}</strong>
          </p>

          <div className="confirm-delete-modal-actions">
            <button
              type="button"
              className="confirm-delete-modal-cancel"
              onClick={onCancel}
            >
              {cancelButtonText}
            </button>

            <button
              type="button"
              className="confirm-delete-modal-confirm"
              onClick={handleConfirmClick}
            >
              {confirmButtonText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}