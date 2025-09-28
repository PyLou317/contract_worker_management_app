import refreshToken from '@/utilities/refreshToken';

const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const attemptRequest = async (tokenOverride = null) => {
    const currentToken = tokenOverride || localStorage.getItem('authToken');

    const headers = {
      ...options.headers,
      ...(currentToken && { Authorization: `Bearer ${currentToken}` }),
      'Content-Type': options.headers?.['Content-Type'] || 'application/json',
    };

    const config = {
      ...options,
      headers,
    };

    return fetch(`${BASE_URL}${endpoint}`, config);
  };

  let response = await attemptRequest();

  if (response.status === 401) {
    console.log('Access token expired. Attempting refresh...');
    try {
      const newToken = await refreshToken();
      console.log('Token refreshed successfully');
      response = await attemptRequest(newToken);
    } catch (error) {
      console.error('Refresh token failed. Redirecting to login.', error);
      localStorage.removeItem('authToken');
      localStorage.removeItem('refreshToken');
      window.location.href = '/login';

      throw new Error('Authentication expired. Please log in again.');
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ detail: 'An unknown server error occurred.' }));
    throw new Error(errorData.detail || `HTTP Error: ${response.status}`);
  }

  return response.json();
};

export default apiFetch;
