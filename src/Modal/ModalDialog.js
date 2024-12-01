import React, { useEffect } from 'react';
import '../App.css'

export default function ModalDialog({ title, onClose }) {
  // Close the modal when clicking outside of the modal content
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Close the modal when pressing the Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // Prevent background scrolling when the modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div
        className="modal-content"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
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
}
