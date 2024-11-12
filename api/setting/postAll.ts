//기존 유저 알림 테스트 전에 요청 필요
export const postAll = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/setting/notifications/new`, {
      method: 'POST',
      credentials: 'include',
    });
    
    const data = await response.json();
    return data

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
