import { UserData } from '../../types/dataType';

const tempData: UserData = {
  "success": true,
  "code": 200,     
  "data": {
    "nickname": "somi",
    "postsCount": 1,
    "saveCount": 1,
    "followerCount": 1,
    "point": 12400
  }
};

export const getUserData = async () => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
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
    if (data.code === 2000 || data.code === 4002) {
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