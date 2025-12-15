import LoadingSpinner from '@/components/Loader';

export default function StatCard({ icon, title, value, className, loading }) {
  return (
    <div
      className={`py-8 px-4 bg-white rounded-lg shadow-md flex items-center space-x-4 hover:scale-101 transition-transform duration-200 ${className}`}
    >
      <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="text-gray-500 text-sm font-medium">{title}</h4>
        {loading ? (
          <LoadingSpinner size="10" />
        ) : (
          <p className="text-3xl font-semibold text-gray-900">{value}</p>
        )}
      </div>
    </div>
  );
}
