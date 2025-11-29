export default function SubmitBtn({
  label,
  disabled,
  handleSubmit,
  extraClasses,
  ...props
}) {
  return (
    <button
      type="submit"
      className={`px-4 py-2 ${
        disabled ? 'bg-gray-300 hover:null' : 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
      } text-white font-medium rounded-lg transition-colors ${extraClasses}`}
      disabled={disabled}
      onClick={handleSubmit}
      {...props}
    >
      {label}
    </button>
  );
}
