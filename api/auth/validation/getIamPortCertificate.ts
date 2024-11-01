export const getIamPortCertificate = async (imp_uid: any, access_token: string) => {

  try {

    const response = await fetch(`https://api.iamport.kr/certifications/${imp_uid}`, {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${access_token}`
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    return data;

  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }
    throw error; 
  }
};
