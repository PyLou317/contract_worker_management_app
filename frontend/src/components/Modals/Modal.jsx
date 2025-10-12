import handleLogout from '../Authentication/LogoutFunction';

export default function WarningModal({ show, modalTitle, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="w-full max-w-md py-12 bg-gray-800 rounded-lg shadow-xl">
        {children}
      </div>
    </div>
  );
}
