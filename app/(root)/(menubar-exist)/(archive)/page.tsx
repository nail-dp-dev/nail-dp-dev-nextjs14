'use client'

import React, { Suspense, useEffect, useRef, useState } from 'react';
import CategoryBar from '../../../../components/bars/CategoryBar';
import { archiveCategoryElements, getPostsNumber } from '../../../../constants';
import Loading from '../../../loading';
import LoginSuggestModal from '../../../../components/modal/mini/LoginSuggestModal';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../../../store/slices/boxLayoutSlice';
import { selectButtonState } from '../../../../store/slices/getLikedPostsSlice';
import { getAllPostsData } from '../../../../api/post/getAllPostsData';
import { PostArray } from '../../../../types/dataType';
import { getLikedPosts } from '../../../../api/post/getLikedPostsData';
import PostBox from '../../../../components/boxes/PostBox';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';

export default function ArchivePage() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const layoutNum = useSelector(selectNumberOfBoxes);
  const size = getPostsNumber[layoutNum].number;

  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] = useState<boolean>(false);
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('for-you')
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursorId, setCursorId] = useState<number>(0);
  const [isContentExist, setIsContentExist] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [isLikedPostsFirstRendering, setIsLikedPostsFirstRendering] = useState<boolean>(true);
  const [isLikedPostsLast, setIsLikedPostsLast] = useState<boolean>(false);
  const [isLikedPostsLoading, setIsLikedPostsLoading] = useState<boolean>(true);
  const [cursorLikedId, setCursorLikedId] = useState<number>(0);
  const [isLikedPostsContentExist, setIsLikedPostsContentExist] = useState<boolean>(false);
  const [likedPostsMessage, setLikedPostsMessage] = useState<string>('');
  const [likedPostsData, setLikedPostsData] = useState<PostArray[]>([]);

  const boxRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const likedPostsBottomRef = useRef<HTMLDivElement>(null);
  const likedButtonState = useSelector(selectButtonState);

  const fetchMorePosts = async () => {
    let data = await getAllPostsData({ category, size, cursorId });

    if (data.code === 2000 && data.data.postSummaryList.content.length !== 0) {
      setIsLoading(true);
      setCursorId(data.data.cursorId);
      setPostsData((prev: PostArray[]) => [
        ...prev,
        ...data.data.postSummaryList.content,
      ]);
      setIsLast(data.data.postSummaryList.last);
      setMessage(data.message);
      setIsLoading(false);
      setIsFirstRendering(false);
      setIsContentExist(true);
    } else if (
      data.code === 2000 &&
      data.data.postSummaryList.content.length === 0
    ) {
      setIsLoading(true);
      setMessage('조회된 게시글이 없습니다.');
      setIsLoading(false);
      setIsContentExist(false);
      return;
    }
  };

  const fetchMorePostsByLikedButton = async () => {
    let data = await getLikedPosts({ category, size, cursorLikedId });

    if (data.code === 2000 && data.data.postSummaryList.content.length !== 0) {
      setIsLikedPostsLoading(true);
      setCursorLikedId(data.data.oldestPostId);
      setLikedPostsData((prev: PostArray[]) => [
        ...prev,
        ...data.data.postSummaryList.content,
      ]);
      setIsLikedPostsLast(data.data.postSummaryList.last);
      setLikedPostsMessage(data.message);
      setIsLikedPostsLoading(false);
      setIsLikedPostsFirstRendering(false);
      setIsLikedPostsContentExist(true);
    } else if (
      data.code === 2000 &&
      data.data.postSummaryList.content.length === 0
    ) {
      setIsLikedPostsLoading(true);
      setLikedPostsMessage('좋아요한 게시글이 없습니다.');
      setIsLikedPostsLoading(false);
      setIsLikedPostsContentExist(false);
      return;
    }
  };

  useEffect(() => {
    if (likedButtonState) {
      return;
    }

    console.log('fetch...')
    
    if (isFirstRendering) {
      fetchMorePosts();
      console.log('fetch,,,');
    }

    const currentRef = bottomRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLast &&
          !isLoading &&
          isContentExist
        ) {
          fetchMorePosts();
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, isLast ,category]);

  useEffect(() => {
    if (!likedButtonState) {
      return;
    }

    console.log('likedButtonState')

    if (isLikedPostsFirstRendering && likedButtonState) {
      fetchMorePostsByLikedButton();
    }

    const likedButtonCurrentRef = likedPostsBottomRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLikedPostsLast &&
          !isLikedPostsLoading &&
          isLikedPostsContentExist
        ) {
          console.log('Fetching more posts due to intersection observer...');
          fetchMorePostsByLikedButton();
        }
      },
      {
        threshold: 0.5,
      },
    );

    if (likedButtonCurrentRef) {
      observer.observe(likedButtonCurrentRef);
    }

    return () => {
      if (likedButtonCurrentRef) {
        observer.unobserve(likedButtonCurrentRef);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    isLikedPostsLoading,
    cursorLikedId,
    isLikedPostsLast,
    fetchMorePostsByLikedButton,
    isLikedPostsContentExist,
  ]);

  useEffect(() => {
    if (!likedButtonState && !isFirstRendering) {
      setCursorId(0);
      setMessage('');
      setIsContentExist(false);
      setPostsData([]);
      setIsFirstRendering(true);
      setIsLoading(true);
      setIsLast(false);
    }

    if (likedButtonState && !isLikedPostsFirstRendering) {
      setCursorLikedId(0);
      setLikedPostsMessage('');
      setIsLikedPostsContentExist(false);
      setLikedPostsData([]);
      setIsLikedPostsFirstRendering(true);
      setIsLikedPostsLoading(true);
      setIsLikedPostsLast(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likedButtonState]);

  useEffect(() => {
    setCursorId(0);
    setMessage('');
    setIsContentExist(false);
    setPostsData([]);
    setIsFirstRendering(true);
    setIsLoading(true);
    setIsLast(false);
    if (isLoggedIn === 'loggedOut') {
      setCategory('trending')
    }
  },[category, isLoggedIn])

  const itemsToRender = postsData
    ? postsData.length <= layoutNum
      ? postsData
      : postsData.slice(0, postsData.length - (postsData.length % layoutNum))
    : [];

  return (
    <>
      <CategoryBar elements={archiveCategoryElements} category={category} setCategory={setCategory}/>
      <div className='ForYouContainer max-h-full overflow-hidden'>
        <Suspense fallback={<Loading/>}>
          <div
            ref={boxRef}
            className="outBox relative flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll transition-all">
            {!likedButtonState &&
              isContentExist &&
              !isLoading &&
              itemsToRender.map((item, index) => (
                <PostBox
                  key={index}
                  postId={item.postId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  like={item.like}
                  saved={item.saved}
                  createdDate={item.createdDate}
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  />
                ))}
            {!likedButtonState && !isContentExist && isLoading && <Loading />}
            {!likedButtonState && !isContentExist && !isLoading && (
              <div>{message}</div>
            )}
            {likedButtonState &&
              isLikedPostsContentExist &&
              !isLikedPostsLoading &&
              likedPostsData.map((item, index) => (
                <PostBox
                key={index}
                postId={item.postId}
                photoId={item.photoId}
                photoUrl={item.photoUrl}
                like={item.like}
                saved={item.saved}
                createdDate={item.createdDate}
                setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                />
              ))}
            {likedButtonState && !isLikedPostsContentExist && isLikedPostsLoading && (
              <Loading />
            )}
            {likedButtonState &&
              !isLikedPostsContentExist &&
              !isLikedPostsLoading && <div>{likedPostsMessage}</div>}
            <div ref={bottomRef} className="bottom-0 h-[1px] w-full"></div>
          </div>
        </Suspense>
      </div>
      {
        isSuggestLoginModalShow &&
        <LoginSuggestModal />
      }
    </>
  );
}