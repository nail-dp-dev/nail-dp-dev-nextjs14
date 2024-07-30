// 'use client'

// import { useState } from 'react';
// import { PostArray } from '../../types/dataType';
// import { getAllPostsData } from '../../api/post/getAllPostsData';


// const useAllPosts = (category: string, size: number, setIsLast:any, setIsLoading:any, setIsFirstRendering:any, setPostsData:any) => {

//   console.log('useAllPosts')

//   const fetchMorePosts = async () => {
//     console.log('fetchMorePosts ...')
//     setIsLoading(true)

//     let data = await getAllPostsData({ category, size, oldestPostId });
    
//     if (!data.data.postSummaryList.last) {
//       setPostsData((prev: any) => [...prev, ...data.data.postSummaryList.content]);
//       setOldestPostId(data.data.oldestPostId);
//       setIsLast(false);
//       setMessage('');
//       setIsLoading(false);
//       setIsFirstRendering(false)
//     } else {
//       setPostsData((prev: any) => [...prev, ...data.data.postSummaryList.content]);
//       setOldestPostId(data.data.oldestPostId);
//       setIsLast(true);
//       setMessage('No more posts available.');
//       setIsLoading(false);
//     }
//   }

//   return { fetchMorePosts };
// };

// export default useAllPosts;
