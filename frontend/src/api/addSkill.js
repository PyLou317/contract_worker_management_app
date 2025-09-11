import refreshToken from './refreshToken';
import attemptFetchPost from './addWorkerAttemptFetch';

const endpoint = `${import.meta.env.VITE_API_URL}/skills/`;

const addSkill = async (formData) => {
  let authToken = localStorage.getItem('authToken');

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    return await attemptFetchPost(authToken, formData, endpoint);
  } catch (error) {
    console.error('Error adding skill:', error);

    if (error.response && error.response.status !== 401) {
      const errorData = await error.response.json();
      throw new Error(errorData.email[0] || 'Validation error');
    }

    if (error.message === 'Unauthorized') {
      console.log('Token expired. Attempting to refresh...');
      try {
        const newAuthToken = await refreshToken();
        return await attemptFetchPost(newAuthToken, formData, endpoint);
      } catch (refreshError) {
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};

export default addSkill;
