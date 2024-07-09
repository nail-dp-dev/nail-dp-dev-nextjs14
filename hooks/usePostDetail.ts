'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { PostsDetailData, CommentData } from '../types/dataType';
import { commentsDetail } from '../api/post/getCommentsDetailData';
import { postsDetail } from '../api/post/getPostsDetailData';

type UserDetail = {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
};

export default function useUser() {
  const { postId } = useParams();
  const [userDetail, setUserDetail] = useState<UserDetail | null>(null);

  useEffect(() => {
    if (!postId) return;

    const numericPostId = Number(postId);
    const postData = postsDetail.find(
      (post) => post.data.postId === numericPostId,
    );
    const commentsData = commentsDetail.find(
      (comment) => comment.postId === numericPostId,
    );

    if (postData && commentsData) {
      setUserDetail({
        post: postData.data,
        comments: commentsData.data,
      });
    }
  }, [postId]);

  return userDetail;
}
