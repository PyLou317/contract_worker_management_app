import refreshToken from '@/utilities/refreshToken';

const url = `${import.meta.env.VITE_API_URL}`;

const attemptFetch = async (token, formData, apiEndpoint, method = 'PATCH') => {
  const response = await fetch(apiEndpoint, {
    method: method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 401) {
    throw response;
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Server error details:', errorData);

    const errorMessage =
      errorData.detail ||
      errorData.message ||
      'Failed to send data to the server.';
    const validationError = new Error(errorMessage);
    validationError.data = errorData; // Attach error data for external handlers
    throw validationError;
  }

  return await response.json();
};

const sendData = async (formData, endpoint, method) => {
  const authToken = localStorage.getItem('authToken');
    const apiEndpoint = url + endpoint;
    console.log(apiEndpoint)

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    return await attemptFetch(authToken, formData, apiEndpoint, method);
  } catch (error) {
    if (error instanceof Response && error.status === 401) {
      console.log('Token expired. Attempting to refresh...');

      try {
        const newAuthToken = await refreshToken();
        localStorage.setItem('authToken', newAuthToken);

        return await attemptFetch(newAuthToken, formData, apiEndpoint, method);
      } catch (refreshError) {
        console.error('Token refresh failed:', refreshError);
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export default sendData;
