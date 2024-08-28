export const postPostShare = async (postId: number): Promise<number | null> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/shared`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error('Failed to share post');
    }

    const data = await response.json();

    console.log('Post shared successfully:', data);

    if (data.data !== null) {
      return data.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error sharing post:', error);
    return null;
  }
};
