'use client';

import { useEffect, useState } from 'react';
import { getAllPostsData } from '../api/post/getAllPostsData';
import { AllPostsData } from '../types/dataType';


const useAllPosts = (category: string, page: number, size: number) => {

  const [postsData, setPostsData] = useState<AllPostsData | null>(null);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const data = await getAllPostsData(category, page, size);
        if (data) {
          setPostsData(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    getData();
  }, [category, page, size]);

  return postsData;
}

export default useAllPosts