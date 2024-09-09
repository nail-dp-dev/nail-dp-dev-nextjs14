import { ArchiveDataProps } from '../../constants/interface';

export const getArchiveDetailLikedData = async ({ archiveId, size, cursorId }: ArchiveDataProps) => {
      
  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/archive/${archiveId}/like`
    
    // if (size) {
    //   url += `size=${size}`
    // }

    // if (cursorId !== 0) {
    //   url += `&cursorId=${cursorId}`
    // }

    console.log(url)

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })

    console.log(response,'리슴폰슨...')

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
    
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
