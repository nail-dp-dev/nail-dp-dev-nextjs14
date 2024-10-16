export const postImageChat = async (file: File, chatRoomId:string) => {
  
  try {

    const multipartFormData = new FormData();
    const blob = new Blob([file], { type: file.type });
    multipartFormData.append('images', blob, file.name);

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chatRoomId}`, {
      method: 'POST',
      credentials: 'include',
      body: multipartFormData,
    });

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