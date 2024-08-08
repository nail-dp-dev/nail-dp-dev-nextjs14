import { PostsDataProps } from '../../constants/interface';

export const getAllPostsData = async ({ category, size, oldestPostId }: PostsDataProps) => {

  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/home?choice=${category}`
    if (size) {
      url += `&size=${size}`
    }
    if (oldestPostId !== 0) {
      url += `&oldestPostId=${oldestPostId}`
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