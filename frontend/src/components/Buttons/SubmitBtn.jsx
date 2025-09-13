export default function SubmitBtn({ label, disabled, handleSubmit }) {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
      disabled={disabled}
      onClick={handleSubmit}
    >
      {label}
    </button>
  );
}
