export const getArchiveSelectData = async (
  archiveId: string,
  cursorId?: number,
) => {
  try {
    const api =
      cursorId == undefined
        ? `${process.env.NEXT_PUBLIC_API_URL}/archive/${archiveId}?size=${30}`
        : `${process.env.NEXT_PUBLIC_API_URL}/archive/${archiveId}?cursorId=${cursorId}&&size=${30}`;
    const response = await fetch(api, {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

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
