
export const postPostLike = async (postId:number)  => {

  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/likes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code === 2001) {
      return data
    } else {
      return null
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