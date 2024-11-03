export const getUserData = async () => {

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })

    console.log("유저",response);
    

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();

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