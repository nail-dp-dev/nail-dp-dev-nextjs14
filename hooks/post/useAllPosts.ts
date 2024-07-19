'use client'

import { useEffect, useState, useCallback } from 'react';
import { PostArray } from '../../types/dataType';
import { getAllPostsData } from '../../api/post/getAllPostsData';


const useAllPosts = (category: string, size: number) => {
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [oldestPostId, setOldestPostId] = useState<number | null>(null);
  const [isLast, setIsLast] = useState<Boolean | false>(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('')
  
  const fetchMorePosts = useCallback(async () => {
    if (loading || isLast) return;

    setLoading(true);

    try {
      let data;

      if (oldestPostId !== null && !isLast) {
        data = await getAllPostsData({category, size, oldestPostId});
      } else if (oldestPostId === null && !isLast) {
        data = await getAllPostsData({category, size});
      }
      if (data) {
        setPostsData(prev => [...prev, ...data.data.postSummaryList.content]);
        setOldestPostId(data.data.oldestPostId);
        setIsLast(data.data.postSummaryList.last);
        setMessage(data.data.message);
      } else {
        setMessage('No data recieved from server...')
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

  return { postsData, fetchMorePosts, isLast, message };
};

export default useAllPosts;
