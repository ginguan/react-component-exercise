import React, { useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import '../App.css'

function ModalDialogWithCreatePortal({ title,  onClose}) {
  const modalRef = useRef(null);

  useEffect(() => {
    // Focus the modal when it opens
    if (modalRef.current) {
      modalRef.current.focus();
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    // Add event listener
    document.addEventListener('keydown', handleKeyDown);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    // Clean up on unmount
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div
      className="modal-overlay"
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div
        className="modal-content"
        ref={modalRef}
        tabIndex={-1}
      >
        <button className="modal-close-button" onClick={onClose} aria-label="Close Modal">
          &times;
        </button>
        <h1 id="modal-title">{title}</h1>
        <div style={{marginTop:'10px'}}>
          <span style={{fontSize:'20px'}}>
            Here is a modal dialog that built from scratch
          </span>
            </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modalContent, document.body);
}

export default ModalDialogWithCreatePortal;

