import { useRef } from 'react';

export default function Modal({ show, children, onClose }) {
  const dialogRef = useRef(null);

  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-gray-800/75 absolute inset-0" onClick={onClose}></div>
      <dialog
        ref={dialogRef}
        className={` bg-gray-900 text-white p-8 rounded-2xl shadow-xl max-w-lg w-full transform transition-transform duration-300 relative ${
          show ? 'scale-100' : 'scale-95'
        }`}
        open={show}
        onClose={onClose}
      >
        {children}
      </dialog>
    </div>
  );
}
