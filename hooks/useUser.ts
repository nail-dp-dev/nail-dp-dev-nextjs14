'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { postsDetail } from '../api/post/getPostsDetailData';
import { PostsDetailData } from '../types/dataType';

export default function useUser() {
  const { postId } = useParams();
  const [user, setUser] = useState<PostsDetailData['data'] | null>(null);

  useEffect(() => {
    if (!postId) return;

    const numericPostId = Number(postId);
    const userData = postsDetail.find(
      (post) => post.data.postId === numericPostId,
    );

    if (userData) {
      setUser(userData.data);
    }
  }, [postId]);

  return user;
}
