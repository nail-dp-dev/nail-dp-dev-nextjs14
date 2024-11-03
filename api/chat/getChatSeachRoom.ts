export const getChatSearchRoom = async (keyword:string) => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/search?keyword=${keyword}`, {
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