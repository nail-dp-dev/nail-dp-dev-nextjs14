export const tempPostCreate = async (formData: FormData) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/temp`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body:formData,
    });
    
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
