'use client'
import { createPortal } from "react-dom"
import { useEffect } from "react"
import { RxCross1 } from "react-icons/rx";
import css from './Modal.module.css'

interface ModalProps{
    children:React.ReactNode,
    onClose:()=> void
}
export default function Modal({children, onClose}:ModalProps){
    const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

    useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);
    return createPortal(
        <div
  className={css.backdrop}
  role="dialog"
  aria-modal="true"
  onClick={handleBackdropClick}
>
  <div className={css.modal}>
    <div className={css.closeBtn} onClick={onClose} aria-label="Close modal">
      <RxCross1 size={20} />
  </div>
    {children}
  </div>
</div>,
document.body
    )
}