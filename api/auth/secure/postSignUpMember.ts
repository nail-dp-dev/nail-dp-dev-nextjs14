import { logIn } from '../../../store/slices/loginSlice'
import { PostSignUpData } from '../../../types/dataType'

export const postSignUpMember = async ({ nickname, finalPhoneNumber, finalAgreement, router, dispatch }:PostSignUpData) => {
  
  try {

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({
        nickname: nickname,
        phoneNumber: finalPhoneNumber,
        agreement: finalAgreement
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }  

    if (data.code === 2001) {
      await router.push('/')
      const platform = localStorage.getItem('tempLoggedInPlatform')
      if (platform === 'kakao' || platform === 'naver' || platform === 'google') {
        localStorage.setItem('loggedInPlatform', platform)
        localStorage.removeItem('tempLoggedInPlatform')
        dispatch(logIn())
      }
    } else if (data.code === 4001) {
      alert(data.message)
      router.push('/')
    } else {
      alert(data.message)
    }

  } catch (error) {

    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('Server returned an error response:', error);
    } else {
      console.error('Unexpected error:', error);
    }

  }
}