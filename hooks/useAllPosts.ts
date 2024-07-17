'use client'

import { useEffect, useState, useCallback } from 'react';
import { getAllPostsData } from '../api/post/getAllPostsData';
import { PostArray } from '../types/dataType';

const useAllPosts = (category: string, size: number) => {
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [oldestPostId, setOldestPostId] = useState<number | null>(null);
  const [isLast, setIsLast] = useState<Boolean | false>(false);
  const [loading, setLoading] = useState(false);
  const fetchMorePosts = useCallback(async () => {
    if (loading || isLast) return;

    setLoading(true);

    try {
      let data;
      if (oldestPostId !== null && !isLast) {
        data = await getAllPostsData(category, size, oldestPostId);
      } else if(oldestPostId == null && !isLast) {
        data = await getAllPostsData(category, size);
      }

      if (data) {
        setPostsData(prev => [...prev, ...data.data.postSummaryList.content]);
        setOldestPostId(data.data.oldestPostId);
        console.log(data.data.oldestPostId);
        setIsLast(data.data.postSummaryList.last);
      } else {
        console.log('No data received');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, oldestPostId, isLast, loading]);

  useEffect(() => {
    fetchMorePosts();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return { postsData, fetchMorePosts };
};

export default useAllPosts;
