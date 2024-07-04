export const getCookieValid = async () => {
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/cookie`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }    
    const data = await response.json();
    return data

  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};