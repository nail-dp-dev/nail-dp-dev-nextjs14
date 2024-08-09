export const getPostsData = async (
  nickname: string,
  cursorId?: number,
  size?: number,
) => {
  try {
    const api =
      cursorId == undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/posts?size=${30}`
        : size! <= 5
          ? `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/posts?cursorId=${cursorId}`
          : `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/posts?cursorId=${cursorId}&&size=${30}`;
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
      return false;
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
      return false;
    } else {
      console.error('Unexpected error:', error);
      return false;
    }
  }
};
