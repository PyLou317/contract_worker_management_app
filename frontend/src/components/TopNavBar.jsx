export default function TopNavBar() {
  return (
    <nav className="bg-gray-900 p-4 text-white">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold cursor-pointer">HIVE</h1>
        <div className="flex space-x-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer">Login</button>
        </div>
      </div>
    </nav>
  );
} 
