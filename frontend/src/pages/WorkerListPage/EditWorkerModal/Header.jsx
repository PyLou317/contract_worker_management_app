export default function Header({ onClick }) {
  return (
    <div className="flex justify-between pb-3 mb-8 border-b border-gray-700">
      <h3 className="text-4xl font-semibold text-white">Edit Worker</h3>
      <button onClick={onClick} className="text-gray-200 hover:text-gray-700 cursor-pointer">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
