export const getProfileArchive = async (nickname: string, cursorId?: number) => {
  try {
    const api =
      cursorId == null
        ? `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/archive?size=${30}`
        : `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/archive?cursorId=${cursorId}&&size=${30}`;
    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
