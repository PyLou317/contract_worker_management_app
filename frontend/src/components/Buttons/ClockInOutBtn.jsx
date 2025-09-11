export default function ClockInOutBtn({ label }) {
  return (
    <button
      type="button"
      className="px-12 py-8 bg-gray-500 text-white font-large font-bold rounded-lg hover:bg-gray-600 transition-colors border-2 border-gray-500"
    >
      {label}
    </button>
  );
}
