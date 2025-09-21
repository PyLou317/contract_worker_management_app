const endpoint = `${import.meta.env.VITE_API_URL}/agencies/`;

export async function getAgencies() {
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