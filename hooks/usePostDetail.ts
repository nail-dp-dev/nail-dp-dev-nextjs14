'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostsDetailData, CommentData } from '../types/dataType';
import { getPostsDetailData } from '../api/post/getPostsDetailData';
import { commentsDetail } from '../api/post/getCommentsDetailData';

type UserDetail = {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
};

export default function usePostDetail() {
  const { postId } = useParams();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (!postId) return;

    const numericPostId = Number(postId);

    const fetchData = async () => {
      const postData = await getPostsDetailData(numericPostId);
      console.log('Fetched post data:', postData); 
      const commentsData = commentsDetail.find(
        (comment) => comment.postId === numericPostId,
      );

      if (postData && commentsData) {
        setUserDetail({
          post: postData.data,
          comments: commentsData.data,
        });
      }
    };

    fetchData();
  }, [postId]);

  return userDetail;
}
