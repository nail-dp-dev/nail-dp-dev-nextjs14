export const postImageChat = async (files: FileList, chatRoomId: string) => {
  try {
    const multipartFormData = new FormData();
    
    // Append each file to the FormData
    Array.from(files).forEach((file) => {
      const blob = new Blob([file], { type: file.type });
      multipartFormData.append('images', blob, file.name);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chatRoomId}/images`, {
      method: 'POST',
      credentials: 'include',
      body: multipartFormData,
    });

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
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
