export const editWorker = async ({ formData, id }) => {
  let authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  const endpoint = `workers/${id}/`;

  try {
    const response = await attemptFetch(authToken, endpoint, formData);

    if (!response.ok) {
      if (response.status === 401) {
        throw new Error('Unauthorized');
      }
      try {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An unknown error occurred.');
      } catch (error) {
        throw new Error(`Server returned an error: ${response.status} ${response.statusText}`);
      }
    }

    return await response.json();
  } catch (error) {
    if (error.message === 'Unauthorized') {
      console.log('Token expired. Attempting to refresh...');
      try {
        const newAuthToken = await refreshToken();
        const newResponse = await attemptFetch(newAuthToken);
        if (!newResponse.ok) {
          throw new Error('Failed to refresh token');
        }
        return await newResponse.json();
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};