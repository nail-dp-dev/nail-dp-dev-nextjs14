'use client';

import { useEffect, useState } from 'react';
import { getAllPostsData } from '../api/post/getAllPostsData';
import { AllPostsData } from '../types/dataType';


const useAllPosts = () => {

  const [postsData, setPostsData] = useState<AllPostsData | null>(null);
  
  useEffect(() => {

    const getData = async () => {
      try {
        const data = await getAllPostsData('NEW');
        if (data) {
          setPostsData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, []);

  return postsData;
}

export default useAllPosts