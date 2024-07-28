'use client';

import { useEffect, useState, useCallback } from 'react';
import { PostArray } from '../../types/dataType';
import { getAllPostsData } from '../../api/post/getAllPostsData';

const useAllPosts = (category: string, size: number) => {
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [oldestPostId, setOldestPostId] = useState<number>(0);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const fetchMorePosts = useCallback(async () => {
    if (loading || isLast) return;

    setLoading(true);

    try {
      let data = await getAllPostsData({ category, size, oldestPostId });

      if (data?.data?.postSummaryList?.content.length > 0) {
        setPostsData((prev) => [...prev, ...data.data.postSummaryList.content]);
        setOldestPostId(data.data.oldestPostId);
        setIsLast(data.data.postSummaryList.last);
        setMessage('');
      } else {
        setIsLast(true);
        setMessage('No more posts available.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setMessage('Error fetching data');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMorePosts();
  }, [fetchMorePosts]);

  return { postsData, fetchMorePosts, isLast, message };
};

export default useAllPosts;
