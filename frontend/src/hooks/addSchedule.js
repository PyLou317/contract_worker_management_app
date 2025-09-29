import refreshToken from '@/utilities/refreshToken';

const endpoint = `${import.meta.env.VITE_API_URL}/schedule/create/`;

const attemptFetch = async (token, formData, endpoint) => {
  const response = await fetch(endpoint, {
    method: 'POST',
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

const addSchedule = async (formData) => {
  const authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    return await attemptFetch(authToken, formData, endpoint);
  } catch (error) {
    console.error('Error adding worker:', error);

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
        return await attemptFetch(newAuthToken, formData, endpoint);
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export default addSchedule;
