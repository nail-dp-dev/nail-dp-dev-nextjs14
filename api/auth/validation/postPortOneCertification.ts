export const postPortOneCertification = async (imp_uid:string) => {
  
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/portone/certification`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
      body: JSON.stringify({ imp_uid })
    })

    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorMessage}`);
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