import { PostsDataProps } from '../../constants/interface';

export const getAllPostsData = async ({category, size, oldestPostId}: PostsDataProps)  => {

  try {
    let url = `${process.env.NEXT_PUBLIC_API_URL}/home?choice=${category}`
    if (size) {
      url += `&size=${size}`
    }
    if (oldestPostId) {
      url +=` &oldestPostId=${oldestPostId}`
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
    const data = await response.json();
    if (data.code === 2000 || data.code === 4005) {
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