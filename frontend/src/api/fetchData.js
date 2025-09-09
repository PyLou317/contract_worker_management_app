const endpoint = `${import.meta.env.VITE_API_URL}`;

export async function fetchData({ api }) {
  const url = `${endpoint}/${api}`;

  if (!api) {
    throw new Error('API endpoint is required.');
  }
    
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}
