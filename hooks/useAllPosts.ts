'use client';

import { useEffect, useState } from 'react';
import { getAllPostsData } from '../api/post/getAllPostsData';
import { PostArray } from '../types/dataType';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../store/slice/boxLayoutSlice';

const useAllPosts = (category: string, size: number) => {

  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [oldestPostId, setOldestPostId] = useState<number | null>(null);
  let layoutNum = useSelector(selectNumberOfBoxes);

  useEffect(() => {
    const getData = async () => {
      try {
        let data;
        if (oldestPostId !== null) {
          data = await getAllPostsData(category, size, oldestPostId);
        } else {
          data = await getAllPostsData(category, size);
        }

        if (data) {
          setPostsData(data.data.postSummaryList.content);
          setOldestPostId(data.data.oldestPostId);
          console.log('Data fetched:', data);
        } else {
          console.log('No data received');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [oldestPostId, category, size, layoutNum]);

  return {postsData};
}

export default useAllPosts