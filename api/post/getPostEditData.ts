const editData = [
  {
    data: {
      postContent: '이게 게시물 수정 내용',
      tags: ['가리비네일', '긴손톱'],
      tempSave: false,
      photos: [
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
      ],
      boundary: 'NONE',
    },
    message: '수정 게시글 조회 완료',
    code: 2000,
  },
  {
    data: {
      postContent: '이게 게시물 수정 내용1',
      tags: ['가리비네일1', '긴손톱'],
      tempSave: false,
      photos: [
        {
          fileName: '23a45e0c7b5c4e08653bd1862b0ede97.gif',
          fileSize: 2071805,
          fileUrl:
            'https://ndpdevs3.s3.ap-northeast-2.amazonaws.com/84d11ccc-5c7a-4986-b366-726b3aacd137.png',
        },
      ],
      boundary: 'ALL',
    },
    message: '수정 게시글 조회 완료',
    code: 2000,
  },
];

export const getPostEditData = async (postId:number) => {
  // await
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/getPostsLikedData`, {
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

  return editData[postId];
};
