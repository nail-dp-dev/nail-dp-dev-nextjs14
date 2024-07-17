import { UserData } from '../../types/dataType';

const tempData: UserData = {
  "success": true,
  "code": 200,     
  "data": {
    "nickname": "somi",
    "postsCount": 1,
    "saveCount": 1,
    "followerCount": 1,
    "point": 12400,
    "profileUrl": "https://i.pinimg.com/236x/27/eb/39/27eb393c94e6f1016f1a14263d5e2f79.jpg" 
  }
};

export const getUserData = async () => {

  // await
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/getUserData`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: 'include',
  //   })
  //   .then(response => {
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }
  //     return response.json();
  //   })
  //   .then(data => {
  //     console.log('Success:', data);
  //     localStorage.setItem('signupData', JSON.stringify(data));
  //   })

  return tempData;
};