import { useState } from 'react';
import Brand from '../Brand';

// A simple login component to authenticate and store a JWT token
export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Function to handle form submission and log the user in
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/token/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        // If the server response is not ok, throw an error with the status
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed. Please check your credentials.');
      }

      const data = await response.json();
      // Store the access token in localStorage for later use
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
        console.log('Login successful! Tokens saved:', data.access);
        
      // Navigation to the next page
      window.location.href = '/dashboard';
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <Brand className={'text-4xl text-white font-bold'} />
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl mt-16">
          <h2 className="text-3xl font-bold text-center text-white">Login</h2>
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            {/* Display an error message if one exists */}
            {error && <div className="p-3 text-sm text-red-100 bg-red-600 rounded-md">{error}</div>}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-200">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="relative block w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-200">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="relative block w-full px-3 py-2 mt-1 text-white placeholder-gray-400 bg-gray-700 border border-gray-600 rounded-md appearance-none focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Password"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="remember-me" className="block ml-2 text-sm text-gray-200">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a href="#" className="font-medium text-blue-400 hover:text-blue-300">
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={isPending}
                className="relative flex justify-center w-full px-4 py-2 text-sm font-medium text-white transition duration-300 ease-in-out bg-blue-600 border border-transparent rounded-md group hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                {isPending ? 'Logging In...' : 'Sign In'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
