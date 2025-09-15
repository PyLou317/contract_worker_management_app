const endpoint = `${import.meta.env.VITE_API_URL}/workers/`;

export async function getWorkers({ queryKey }) {
  const [, searchTerm, page, ordering] = queryKey;
  let url = '';

  if (searchTerm || page || ordering) {
    url = `${endpoint}?search=${searchTerm}&page=${page}&ordering=${ordering}`;
  } else {
    url = endpoint;
  }

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching workers:', error);
    throw error;
  }
}
