'use client';

import { useEffect, useRef } from 'react';
import useAllPosts from '../../hooks/useAllPosts';
import PostBox from './PostBox';
import Loading from '../../app/loading';
import { usePathname } from 'next/navigation';
import { getArchivePath, getPostsNumber } from '../../constants';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';
import { useSelector } from 'react-redux';

export default function PostsBox() {
  const path = usePathname() as '/' | '/new' | '/trending';
  const category = getArchivePath[path].result;
  const layoutNum = useSelector(selectNumberOfBoxes);
  const size = getPostsNumber[layoutNum].number;
  const { postsData, fetchMorePosts } = useAllPosts(category, size);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    console.log('layoutNum changed:', layoutNum);
    const currentRef = bottomRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log('Bottom ref is intersecting', entries);
        fetchMorePosts();
      }
    }, {
      threshold: 0.5
    });

    if (currentRef) {
      observer.observe(currentRef);
      console.log('Observer started observing', currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
        console.log('Observer stopped observing', currentRef);
      }
    };
  }, [fetchMorePosts, layoutNum]);

  const itemsToRender = postsData ? postsData.slice(0, postsData.length - (postsData.length % layoutNum)) : [];

  return (
    <div
      className='outBox relative flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll transition-all'
      onScroll={() => console.log('Scrolling...')}
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
      <div ref={bottomRef} className='bottom-0 h-[2px] w-full'></div>
    </div>
  );
}
