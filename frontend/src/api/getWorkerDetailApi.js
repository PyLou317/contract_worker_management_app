const endpoint = `${import.meta.env.VITE_API_URL}/workers`;

export async function getWorkerDetails({ workerId }) {
  const url = `${endpoint}/${workerId}`;

  if (!workerId) {
    throw new Error('Worker ID is required to fetch details.');
  }
    
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching worker:', error);
    throw error;
  }
}
