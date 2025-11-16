export default function SubmitBtn({ label, disabled, handleSubmit, ...props }) {
  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors cursor-pointer"
      disabled={disabled}
      onClick={handleSubmit}
      {...props}
    >
      {label}
    </button>
  );
}
