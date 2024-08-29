export const getCommentLike = async (postId: number, commentId: number) => {
  try {
    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}/like`,
    );

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch like count for comment');
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    return data;
  } catch (error) {
    console.error('Error fetching like count:', (error as Error).message);
    throw error;
  }
};
