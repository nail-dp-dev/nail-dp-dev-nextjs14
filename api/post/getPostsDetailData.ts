import { getCookie } from '../../lib/getCookie';
import { PostsDetailData } from '../../types/dataType';



export const getPostsDetailData = async (postId: number): Promise<PostsDetailData | null> => {
  try {
    const cookie = getCookie('Authorization');
    if (!cookie) throw new Error('인증 쿠키를 찾을 수 없습니다.');

    const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}`;
    const headers = {
      'Content-Type': 'application/json',
    };

    const response = await fetch(url, {
      method: 'GET',
      headers,
      credentials: 'include',
    });

    console.log('API Response Status:', response.status); 
    console.log('API Response:', response); 

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error response text:', errorText);
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: PostsDetailData = await response.json();
    console.log('Response Data:', data);
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('Server returned an error response:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return null;
  }
};