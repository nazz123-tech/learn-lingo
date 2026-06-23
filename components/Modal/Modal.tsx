'use client'
import { createPortal } from "react-dom"
import { useEffect, useState } from "react"
import { RxCross1 } from "react-icons/rx";
import css from './Modal.module.css'

interface ModalProps {
  children: React.ReactNode;
  onClose: () => void;
}

export default function Modal({ children, onClose }: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 200);
  };

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) handleClose();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div
      className={`${css.backdrop} ${isClosing ? css.backdropHide : ''}`}
      role="dialog"
      aria-modal="true"
      onClick={handleBackdropClick}
    >
      <div className={`${css.modal} ${isClosing ? css.modalHide : ''}`}>
        <div className={css.closeBtn} onClick={handleClose} aria-label="Close modal">
          <RxCross1 size={20} />
        </div>
        {children}
      </div>
    </div>,
    document.body
  )
}