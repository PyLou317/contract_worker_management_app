export default function CancelBtn({ disabled, onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
      disabled={disabled}
    >
      {label}
    </button>
  );
}
