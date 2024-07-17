import { logOut } from '../../../store/slice/loginSlice';
import { AppDispatch } from '../../../store/store';


export const getLogOut = async (dispatch: AppDispatch) => {

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    if (data.code === 2000) {
      dispatch(logOut())
    } else if (data.code === 4001) {
      console.log('로그아웃 실패')
    } else {
      console.log('Response Error:', data.message)
      return false
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
