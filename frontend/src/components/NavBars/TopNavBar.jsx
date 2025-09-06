export default function TopNavBar() {
  const handleLogout = () => {
    // Remove the tokens from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
    // Reload the page to reset the app state and show the login page
    window.location.reload();
  };

  return (
    <nav className="p-6 border-b-2 border-gray-200 w-full bg-white flex justify-between items-center space-x-4">
      <h1 className="text-2xl font-semibold">Welcome, Lucas!</h1>
    </nav>
  );
}
