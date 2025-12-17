export default function SucessNotification({ successRef, message }) {
  return (
    <div className="fixed top-20 left-100 w-1/2 z-50 p-4" ref={successRef}>
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
        <span className="block sm:inline">{message}</span>
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer"
          onClick={() => setSuccessMessage(null)}
        >
          <svg
            className="fill-current h-6 w-6 text-green-500"
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.85l-2.651 2.99a1.2 1.2 0 1 1-1.697-1.697l2.99-2.651-2.99-2.651a1.2 1.2 0 0 1 1.697-1.697L10 8.15l2.651-2.99a1.2 1.2 0 1 1 1.697 1.697L11.85 10l2.99 2.651a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </div>
  );
}
