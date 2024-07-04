export const getKakaoAuthCode = async (code: string, router: any) => {
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/kakao?code=${code}`, {
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

    if (data.code === 2000) {
      alert(data.message)
      router.push('/');
    } else if (data.code === 2001) {
      router.push('/sign-up');
    }

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