import refreshToken from './refreshToken';
import logout from '@/components/Authentication/LogoutFunction';

const attemptFetch = async ({ token, url }) => {
  try {
    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    const responseData = await response.json().catch(() => null);

    if (!response.ok) {
      const errorMsg = responseData?.message || `Server error: ${response.status} ${response.statusText}`;
      throw new Error(errorMsg);
    }

    return responseData;
  } catch (error) {
    if (error.message.includes('Unauthorized')) {
      throw new Error('Unauthorized');
    }
    throw error;
  }
};

let url = `${import.meta.env.VITE_API_URL}/`;

export const deleteWorker = async ({ workerId }) => {
  const authToken = localStorage.getItem('authToken');
  const endpoint = url + `workers/${workerId}/`;

  if (!authToken) {
    throw new Error('Authentication token not found. Please log in.');
  }

  try {
    return await attemptFetch({ token: authToken, url: endpoint });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      console.log('Token expired. Attempting to refresh...');
      try {
        const newAuthToken = await refreshToken();
        if (!newAuthToken) {
          throw new Error('Failed to refresh token.');
        }
        return await attemptFetch(newAuthToken, endpoint);
      } catch (refreshError) {
        if (refreshError.status === 401) logout();
        throw new Error('Session expired. Please log in again.');
      }
    } else {
      throw error;
    }
  }
};
