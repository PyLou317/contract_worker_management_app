import handleLogout from '../Authentication/LogoutFunction';

export default function LogoutModal({ onClose }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-10 text-yellow-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
        />
      </svg>
      <div className="text-gray-800 text-center">
        <p className="text-lg font-semibold">
          Are you sure you want to log out?
        </p>
        <p className="text-sm text-gray-400 mt-2">
          You will need to sign in again to access your account.
        </p>
        <div className="flex justify-center gap-3 mt-6">
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
