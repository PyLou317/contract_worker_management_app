import { useState } from 'react';
import Input from '@/components/Inputs/LabeledInput';
import SubmitBtn from '@/components/Buttons/SubmitBtn';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

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
        const errorData = await response.json();
        throw new Error(
          errorData.detail || 'Login failed. Please check your credentials.'
        );
      }

      const data = await response.json();
      localStorage.setItem('authToken', data.access);
      localStorage.setItem('refreshToken', data.refresh);
      console.log('Login successful! Tokens saved:', data.access);

      window.location.href = '/';
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  const extraClasses =
    'text-gray-200 caret-gray-200 placeholder:text-gray-200 mt-10';

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900">
        <h1 className="text-3xl font-bold text-yellow-100">
          <span>
            <i className="fa-solid fa-hexagon"></i>
          </span>{' '}
          <span>the HIVE</span>
        </h1>
        <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-xl mt-12">
          <h2 className="text-3xl font-bold text-center text-gray-100">
            Login
          </h2>
          <form className="mt-8 space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-100 bg-red-600 rounded-md">
                {error}
              </div>
            )}
            <Input
              label="Email"
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={extraClasses}
            />
            <Input
              label="Password"
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={extraClasses}
            />
            <div className="flex items-center justify-between mt-8">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label
                  htmlFor="remember-me"
                  className="block ml-2 text-sm text-gray-200"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-blue-400 hover:text-blue-300"
                >
                  Forgot your password?
                </a>
              </div>
            </div>
            <div>
              <SubmitBtn
                label={isPending ? 'Logging In...' : 'Sign In'}
                type="submit"
                disabled={isPending}
                extraClasses="w-full"
                handleSubmit={handleSubmit}
              ></SubmitBtn>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
