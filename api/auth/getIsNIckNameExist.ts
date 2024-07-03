export const getIsNickNameExist = async (nickname: string): Promise<boolean> => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/nickname`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nickname }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code === 2000) {
      return true
    } else if (data.code === 4001) {
      return false
    } else {
      console.log('Response Error:', data.message)
      return false
    }
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
      return false
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('Server returned an error response:', error);
      return false
    } else {
      console.error('Unexpected error:', error);
      return false
    }
  }
};
