'use client';

import { useEffect, useRef, useState } from 'react';
import PostBox from './PostBox';
import Loading from '../../app/loading';
import { usePathname } from 'next/navigation';
import { getArchivePath, getPostsNumber } from '../../constants';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';
import { useSelector } from 'react-redux';
import { PostArray } from '../../types/dataType';
import { getAllPostsData } from '../../api/post/getAllPostsData';
import { selectButtonState } from '../../store/slice/getLikedPostsSlice';
import { getLikedPosts } from '../../api/post/getLikedPostsData';

export default function PostsBox() {
  const path = usePathname() as '/' | '/new' | '/trending';
  const category = getArchivePath[path].result;
  const layoutNum = useSelector(selectNumberOfBoxes);
  const size = getPostsNumber[layoutNum].number;
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true)
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [oldestPostId, setOldestPostId] = useState<number>(0);
  const [isContentExist, setIsContentExist] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [isLikedPostsFirstRendering, setIsLikedPostsFirstRendering] = useState<boolean>(true)
  const [isLikedPostsLast, setIsLikedPostsLast] = useState<boolean>(false);
  const [isLikedPostsLoading, setIsLikedPostsLoading] = useState<boolean>(true);
  const [oldestLikedPostId, setOldestLikedPostId] = useState<number>(0);
  const [isLikedPostsContentExist, setIsLikedPostsContentExist] = useState<boolean>(false);
  const [likedPostsMessage, setLikedPostsMessage] = useState<string>('');
  const [likedPostsData, setLikedPostsData] = useState<PostArray[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const likedPostsBottomRef = useRef<HTMLDivElement>(null);
  const likedButtonState = useSelector(selectButtonState);

  console.log('Component rendering...!!');

  const fetchMorePosts = async () => {
    console.log('fetchMorePosts called...');
    let data = await getAllPostsData({ category, size, oldestPostId });

    if (data.code === 2000 && data) {
      setIsLoading(true);
      setOldestPostId(data.data.oldestPostId);
      setPostsData((prev: PostArray[]) => [...prev, ...data.data.postSummaryList.content]);
      setIsLast(data.data.postSummaryList.last);
      setMessage(data.data.message);
      setIsLoading(false);
      setIsFirstRendering(false);
      setIsContentExist(true)
    } else if (data.code === 4005) {
      setIsLoading(true);
      setMessage(data.message)
      setIsLoading(false)
      setIsContentExist(false)
      return;
    }
  };

  const fetchMorePostsByLikedButton = async () => {
    let data = await getLikedPosts({ category, size, oldestPostId });

    if (data.code === 2000 && data) {
      setIsLikedPostsLoading(true);
      setOldestLikedPostId(data.data.oldestPostId);
      setLikedPostsData((prev: PostArray[]) => [...prev, ...data.data.postSummaryList.content]);
      setIsLikedPostsLast(data.data.postSummaryList.last);
      setLikedPostsMessage(data.data.message);
      setIsLikedPostsLoading(false);
      setIsLikedPostsFirstRendering(false);
      setIsLikedPostsContentExist(true)
    } else if (data.code === 4005) {
      setIsLikedPostsLoading(true);
      setLikedPostsMessage(data.message)
      setIsLikedPostsLoading(false)
      setIsLikedPostsContentExist(false)
      return;
    }
  }

  useEffect(() => {
    console.log('useEffect 위')
    if (isFirstRendering) {
      fetchMorePosts()
    }

    const currentRef = bottomRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLast && !isLoading && isContentExist) {
        console.log('Fetching more posts due to intersection observer...');
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, oldestPostId, isLast, fetchMorePosts, isContentExist, likedButtonState]);

  useEffect(() => {
    console.log('useEffect')
    if (!likedButtonState) {
      return;
    }

    if (isLikedPostsFirstRendering && likedButtonState) {
      fetchMorePostsByLikedButton()
    }

    const likedButtonCurrentRef = likedPostsBottomRef.current;
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !isLikedPostsLast && !isLikedPostsLoading && isLikedPostsContentExist) {
        console.log('Fetching more posts due to intersection observer...');
        fetchMorePostsByLikedButton();
      }
    }, {
      threshold: 0.5
    });

    if (likedButtonCurrentRef) {
      observer.observe(likedButtonCurrentRef);
    }
    
    return () => {
      if (likedButtonCurrentRef) {
        observer.unobserve(likedButtonCurrentRef);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLikedPostsLoading, oldestLikedPostId, isLikedPostsLast, fetchMorePostsByLikedButton, isLikedPostsContentExist, likedButtonState]);



  const itemsToRender = postsData 
    ? (postsData.length <= layoutNum ? postsData : postsData.slice(0, postsData.length - (postsData.length % layoutNum))) 
    : [];

  const likedPostsitemsToRender = likedPostsData 
    ? (likedPostsData.length <= layoutNum ? likedPostsData : likedPostsData.slice(0, likedPostsData.length - (likedPostsData.length % layoutNum))) 
    : [];
  
  return (
    <div className='outBox relative flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll transition-all'>
      {!likedButtonState && isContentExist && !isLoading && (
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
      )}
      {
        !likedButtonState && !isContentExist && isLoading && 
        <Loading />
      }
      {
        !likedButtonState && !isContentExist && !isLoading &&
        <div>{message}</div>
      }
      {likedButtonState && isLikedPostsContentExist && !isLikedPostsLoading && (
        likedPostsitemsToRender.map((item, index) => (
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
      )}
      {
        likedButtonState && !isLikedPostsContentExist && isLikedPostsLoading && 
        <Loading />
      }
      {
        likedButtonState && !isLikedPostsContentExist && !isLikedPostsLoading &&
        <div>{message}</div>
      }
      <div ref={bottomRef} className='bottom-0 h-[1px] w-full'></div>
    </div>
  );
}
