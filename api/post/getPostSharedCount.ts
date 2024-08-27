export async function getPostSharedCount(postId: number): Promise<number> {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/shared`,
    );

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Failed to fetch shared count: ${errorMessage}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    return data.data;
  } catch (error) {
    console.error('Error fetching shared count:', (error as Error).message);
    throw error;
  }
}
