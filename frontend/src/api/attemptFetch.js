const attemptFetchPost = async (token, formData, endpoint) => {
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
    throw new Error('Failed to add worker');
  }

  return await response.json();
};

export default attemptFetchPost;