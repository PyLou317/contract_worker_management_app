export default function WarningModal({ show, onClose, children }) {
  const handleLogout = () => {
    // Remove the tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Reload the page to reset the app state and show the login page
    window.location.reload();
  };

    if (!show) {
      return null; // Don't render if not visible
    }

  return (
    <div className="fixed inset-0 bg-opacity-75 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl">
        <div className="text-white text-center mb-6">{children}</div>
        <div className="flex justify-end gap-3 mt-4">
          <button
            className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
