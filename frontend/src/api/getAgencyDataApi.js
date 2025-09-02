const endpoint = `${import.meta.env.VITE_API_URL}/agencies/`;

export async function getAgencies({ queryKey }) {
  const [, searchTerm, page, ordering] = queryKey;
//   const url = `${endpoint}?search=${searchTerm}&page=${page}&ordering=${ordering}`;

  try {
    const response = await fetch(endpoint);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching agencies:', error);
    throw error;
  }
}