export const getCommentData = async (
  postId: number,
  cursorId: number | null = null,
) => {
  try {
    const api =
      cursorId == null
        ? `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`
        : `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment?cursorId=${cursorId}`;
    
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('API Response Data:', data);

    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
      return null;
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
      return null;
    } else {
      console.error('Unexpected error:', error);
      return null;
    }
  }
};
