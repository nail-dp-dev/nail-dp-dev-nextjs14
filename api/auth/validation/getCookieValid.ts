import { logIn, logOut } from '../../../store/slice/loginSlice';
import { AppDispatch } from '../../../store/store';

export const getCookieValid = async (dispatch: AppDispatch) => {
  
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/cookie`, {
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
    if (data.code === 2000) {
      dispatch(logIn())
    } else {
      dispatch(logOut())
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