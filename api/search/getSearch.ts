export async function getUserSearchResults(keyword: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/search?keyword=${keyword}`;

  try {
    const response = await fetch(url, {
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
    return data;
  } catch (error) {
    console.error('Error fetching search results:', error);
    alert('서버에서 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    return null;
  }
}

export async function getTagSearchResults(keyword: string) {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/search/tags?keyword=${keyword}`;

  try {
    const response = await fetch(url, {
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
    return data;
  } catch (error) {
    console.error('Error fetching tag search results:', error);
    alert('태그 검색 중 오류가 발생했습니다. 나중에 다시 시도해 주세요.');
    return null;
  }
}

export async function getPostSearchResults(
  keyword: string[],
  cursorId?: number,
  size?: number,
) {
  try {
    const queryParams = keyword
      .map((keyword) => `keyword=${encodeURIComponent(keyword)}`)
      .join('&');
    const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/search/posts?${queryParams}`;

    const api =
      cursorId === undefined
        ? `${baseUrl}&size=${20}`
        : size !== undefined && size <= 5
          ? `${baseUrl}&cursorId=${cursorId}`
          : `${baseUrl}&cursorId=${cursorId}&size=${20}`;

    console.log('요청 URL:', api);

    const response = await fetch(api, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('응답 오류 메시지:', errorData);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
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
}
