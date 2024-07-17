import { PostSignUpData } from '../../../types/dataType'

export const postSignUpMember = async ({ nickname, finalPhoneNumber, finalAgreement, router }:PostSignUpData) => {
  
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
    if (data.code === 2001) {
      alert(data.message)
      router.push('/')
    } else if (data.code === 4001) {
      alert(data.message)
      router.push('/')
    } else {
      alert(data.message)
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
}