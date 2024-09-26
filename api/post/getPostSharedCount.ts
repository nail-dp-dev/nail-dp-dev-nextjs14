export const getPostSharedCount = async (postId: number): Promise<number> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/shared`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    },
  );
  if (!response.ok) {
    throw new Error(`Failed to fetch shared count: ${response.statusText}`);
  }

  const data = await response.json();
  console.log('API Response Data:', data);
  return data.data;
};
