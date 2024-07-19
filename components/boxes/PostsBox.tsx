'use client';

import { useEffect, useRef, useState } from 'react';
import PostBox from './PostBox';
import Loading from '../../app/loading';
import { usePathname } from 'next/navigation';
import { getArchivePath, getPostsNumber } from '../../constants';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';
import { useSelector } from 'react-redux';
import useAllPosts from '../../hooks/post/useAllPosts';

export default function PostsBox() {
  const path = usePathname() as '/' | '/new' | '/trending';
  const category = getArchivePath[path].result;
  const layoutNum = useSelector(selectNumberOfBoxes);
  const size = getPostsNumber[layoutNum].number;
  const { postsData, fetchMorePosts, isLast, message } = useAllPosts(category, size);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const currentRef = bottomRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLast) {
        fetchMorePosts();
      }
    }, {
      threshold: 0.5
    });

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [fetchMorePosts, layoutNum, isLast]);

  const itemsToRender = postsData 
    ? (postsData.length <= layoutNum ? postsData : postsData.slice(0, postsData.length - (postsData.length % layoutNum))) 
    : [];

  return (
    <div
      className='outBox relative flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll transition-all'
    >
      {postsData ?
        itemsToRender.map((item, index) => (
          <PostBox
            key={index}
            postId={item.postId}
            photoId={item.photoId}
            photoUrl={item.photoUrl}
            like={item.like}
            saved={item.saved}
            createdDate={item.createdDate}
          />
        ))
        :
        <Loading />
      }
      <div ref={bottomRef} className='bottom-0 h-[1px] w-full'></div>
    </div>
  );
}
