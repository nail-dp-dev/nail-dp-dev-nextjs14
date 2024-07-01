

import { PostsData } from '../../types/dataType';

const tempData: PostsData = {
    success: true,
    code: 200,
    data: [
      {
        postId: 1,
        photoId: 1,
        photo_url: "string",
        like: true,
        saved: false,
      },
      {
        postId: 2,
        photoId: 2,
        photo_url: "string",
        like: true,
        saved: false,
      }
    ]
  }

export const getPostsLikedData = async () => {

  // await fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPostsLikedData`, {
  //         method: "GET",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         credentials: 'include',
  //       })
  //       .then(response => {
  //         if (!response.ok) {
  //           throw new Error(`HTTP error! Status: ${response.status}`);
  //         }
  //         return response.json();
  //       })
  //       .then(data => {
  //         console.log('Success:', data);
  //         localStorage.setItem('signupData', JSON.stringify(data));
  //       })

  return tempData;
};