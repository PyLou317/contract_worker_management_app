import refreshToken from '@/utilities/refreshToken';

const url = `${import.meta.env.VITE_API_URL}`;

const attemptFetch = async (token, formData, apiEndpoint) => {
  const response = await fetch(apiEndpoint, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });

  if (response.status === 401) {
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Server error details:', errorData);
    throw new Error('Failed to send data to the server.');
  }

  return await response.json();
};

const sendData = async ({formData, endpoint}) => {
  const authToken = localStorage.getItem('authToken');
  console.log('endpoint: ', endpoint);

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    return await attemptFetch(authToken, formData, url + endpoint);
  } catch (error) {
    console.error('Error sending data to the server:', error);

    // Check if the error has a response and it's not a 401
    if (error.response && error.response.status !== 401) {
      // If it's a validation error, parse and re-throw the specific error data
      const errorData = await error.response.json();
      throw new Error(errorData.email[0] || 'Validation error');
    }

    if (error.message === 'Unauthorized') {
      console.log('Token expired. Attempting to refresh...');
      try {
        const newAuthToken = await refreshToken();
        return await attemptFetch(newAuthToken, formData, url + endpoint);
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export default sendData;
