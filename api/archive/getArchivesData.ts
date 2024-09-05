import { ArchivesDataProps } from '../../constants/interface';

export const getAllArchivesData = async ({ category, cursorId }: ArchivesDataProps) => {

  try {

    let url = `${process.env.NEXT_PUBLIC_API_URL}/archive?`

    if (cursorId !== 0) {
      url += `&cursorId=${cursorId}`
    }

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: 'include',
    })

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