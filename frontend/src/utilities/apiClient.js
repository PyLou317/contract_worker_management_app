const BASE_URL = import.meta.env.VITE_API_URL;

export const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken'); // Retrieve the saved token

  const headers = {
    ...options.headers,
    // ONLY set the Authorization header if the token exists
    ...(token && { 'Authorization': `Bearer ${token}` }),
    // Default content type for APIs
    'Content-Type': options.headers?.['Content-Type'] || 'application/json',
  };

  const config = {
    ...options,
    headers,
  };

  // Prepend the base URL
  const response = await fetch(`${BASE_URL}${endpoint}`, config);

  if (!response.ok) {
    // Handle 401 Unauthorized globally here (e.g., redirect to login)
    if (response.status === 401) {
        console.error("Token expired or invalid. Redirecting to login.");
        // Example: Clear token and redirect
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login'; 
    }
    // Convert error response to JSON to get Django's error message
    const errorData = await response.json().catch(() => ({ detail: 'An error occurred.' }));
    throw new Error(errorData.detail || `HTTP Error: ${response.status}`);
  }

  return response.json();
};

export default apiFetch;