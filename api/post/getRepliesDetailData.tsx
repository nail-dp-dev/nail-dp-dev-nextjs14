import { ReplyData } from '../../types/dataType';

export const repliesDetail: ReplyData[] = [
  {
    success: true,
    code: 200,
    commentId: 1,
    data: [
      {
        commentId: 1,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'alice',
        commentDate: '20240701',
        commentContent: '정말 그렇네요!',
        likeCount: 2,
      },
      {
        commentId: 2,
        profileUrl:
          'https://i.pinimg.com/736x/cc/58/c8/cc58c82cb5b49433fa23701b5fe2ed10.jpg',
        commentUserNickname: 'bob',
        commentDate: '20240701',
        commentContent: '동의합니다!',
        likeCount: 1,
      },
      {
        commentId: 2,
        profileUrl:
          'https://i.pinimg.com/736x/cc/58/c8/cc58c82cb5b49433fa23701b5fe2ed10.jpg',
        commentUserNickname: 'bob',
        commentDate: '20240701',
        commentContent: '동의합니다!',
        likeCount: 1,
      },
      {
        commentId: 2,
        profileUrl:
          'https://i.pinimg.com/736x/cc/58/c8/cc58c82cb5b49433fa23701b5fe2ed10.jpg',
        commentUserNickname: 'bob',
        commentDate: '20240701',
        commentContent: '동의합니다!',
        likeCount: 1,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 2,
    data: [
      {
        commentId: 3,
        profileUrl:
          'https://i.pinimg.com/236x/3c/9e/a7/3c9ea7e72fc2c7e8e8f8f8f8f8f8f8f8.jpg',
        commentUserNickname: 'charlie',
        commentDate: '20240702',
        commentContent: '색상이 정말 예뻐요!',
        likeCount: 3,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 3,
    data: [
      {
        commentId: 4,
        profileUrl:
          'https://i.pinimg.com/236x/4a/33/df/4a33dfdd06ed3fd9b3ff4a68d3c6d59e.jpg',
        commentUserNickname: 'david',
        commentDate: '20240703',
        commentContent: '유용한 정보네요!',
        likeCount: 2,
      },
      {
        commentId: 5,
        profileUrl:
          'https://i.pinimg.com/236x/5a/77/8d/5a778d69e6f5f25d8f9c5a2c0e4efb10.jpg',
        commentUserNickname: 'emma',
        commentDate: '20240703',
        commentContent: '감사합니다!',
        likeCount: 4,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 4,
    data: [
      {
        commentId: 6,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'frank',
        commentDate: '20240704',
        commentContent: '멋진 디자인이에요!',
        likeCount: 5,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 5,
    data: [
      {
        commentId: 7,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'grace',
        commentDate: '20240705',
        commentContent: '좋은 글이에요!',
        likeCount: 3,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 6,
    data: [
      {
        commentId: 8,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'henry',
        commentDate: '20240706',
        commentContent: '정말 멋져요!',
        likeCount: 4,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 7,
    data: [
      {
        commentId: 9,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'irene',
        commentDate: '20240707',
        commentContent: '감사합니다!',
        likeCount: 5,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 8,
    data: [
      {
        commentId: 10,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'jack',
        commentDate: '20240708',
        commentContent: '잘 봤어요!',
        likeCount: 2,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 9,
    data: [
      {
        commentId: 11,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'kate',
        commentDate: '20240709',
        commentContent: '좋은 정보 감사합니다!',
        likeCount: 4,
      },
    ],
  },
  {
    success: true,
    code: 200,
    commentId: 10,
    data: [
      {
        commentId: 12,
        profileUrl:
          'https://i.pinimg.com/236x/6a/11/be/6a11be206763cdf800b241ca39edf3c9.jpg',
        commentUserNickname: 'leo',
        commentDate: '20240710',
        commentContent: '멋져요!',
        likeCount: 3,
      },
    ],
  },
];

// 고쳐야함
export const getRepliesDetailData = async () => {
  // await
  //   fetch(`${process.env.NEXT_PUBLIC_API_URL}/getRepliesDetailData`, {
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

  return repliesDetail;
};
