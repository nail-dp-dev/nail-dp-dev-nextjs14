import { redirect } from 'next/navigation';

export const getGoogleAuthCode = async (code:string, router:any) => {

  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/google?code=${code}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: 'include',
        }) 
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Success:', data);
          localStorage.setItem('signupData', JSON.stringify(data));
        })
        .then(
          router.push('/sign-up')
        )
        .catch((error) => {
          console.error('Error:', error);
        });
};