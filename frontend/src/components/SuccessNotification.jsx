export default function SucessNotification({ successRef, message }) {
  return (
    <div
      className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-md relative mb-4"
      role="alert"
      ref={successRef}
    >
      <span className="block sm:inline">{message}</span>
    </div>
  );
}
