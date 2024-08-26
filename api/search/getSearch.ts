export async function getSearchResults(keyword: string) {
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
