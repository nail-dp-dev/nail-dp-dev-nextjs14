'use client';

import React, { Suspense, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';
import { useParams } from 'next/navigation';
import Loading from '../../../../loading';
import { getArchiveDetailData } from '../../../../../api/archive/getArchiveDetailData';
import ControlBar from './components/ControlBar';
import { selectNumberOfBoxes } from '../../../../../store/slices/boxLayoutSlice';
import { getPostsNumber } from '../../../../../constants';
import { PostArray } from '../../../../../types/dataType';
import { selectButtonState } from '../../../../../store/slices/getLikedPostsSlice';
import PostBox from '../../../../../components/boxes/PostBox';
import { getArchiveDetailLikedData } from '../../../../../api/archive/getArchiveDetailLikedData';


export default function DetailArchivePage() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const { archiveId } = useParams<{ archiveId: string }>();
  const layoutNum = useSelector(selectNumberOfBoxes);
  const size = getPostsNumber[layoutNum].number;

  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);
  const [archiveName, setArchiveName] = useState<string>('');
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursorId, setCursorId] = useState<number>(0);
  const [isContentExist, setIsContentExist] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [postsData, setPostsData] = useState<PostArray[]>([]);
  const [isLikedPostsFirstRendering, setIsLikedPostsFirstRendering] =
    useState<boolean>(true);
  const [isLikedPostsLast, setIsLikedPostsLast] = useState<boolean>(false);
  const [isLikedPostsLoading, setIsLikedPostsLoading] = useState<boolean>(true);
  const [cursorLikedId, setCursorLikedId] = useState<number>(0);
  const [isLikedPostsContentExist, setIsLikedPostsContentExist] =
    useState<boolean>(false);
  const [likedPostsMessage, setLikedPostsMessage] = useState<string>('');
  const [likedPostsData, setLikedPostsData] = useState<PostArray[]>([]);
  const [sharedCount, setSharedCount] = useState<number>(0);

  const boxRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const likedPostsBottomRef = useRef<HTMLDivElement>(null);
  const likedButtonState = useSelector(selectButtonState);

  const fetchMorePosts = async () => {

    const currentCursorId = cursorId;
    const currentArchiveId = Number(archiveId)
    let data = await getArchiveDetailData({archiveId:currentArchiveId , size, cursorId: currentCursorId });

    if(isFirstRendering){
      setArchiveName(data.data.archiveName)
    }

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
      
    const currentCursorId = cursorLikedId;
    const currentArchiveId = Number(archiveId)
    let data = await getArchiveDetailLikedData({archiveId:currentArchiveId , size, cursorId: currentCursorId });

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

    if (isFirstRendering) {
      fetchMorePosts();
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
  }, [isLoading, isLast, cursorId]);

  useEffect(() => {
    if (!likedButtonState) {
      return;
    }

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

  // useEffect(() => {
  //   setCursorId(0);
  //   setMessage('');
  //   setIsContentExist(false);
  //   setPostsData([]);
  //   setIsFirstRendering(true);
  //   setIsLoading(true);
  //   setIsLast(false);
  // }, [isLoggedIn]);


  return (
    <>
      <ControlBar archiveName={archiveName}/>
      <div className="ForYouContainer h-dvh overflow-hidden">
        <Suspense fallback={<Loading />}>
          <div
            ref={boxRef}
            className="outBox relative flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll transition-all"
          >
            {!likedButtonState &&
              isContentExist &&
              !isLoading &&
              postsData.map((item, index) => (
                <PostBox
                  key={index}
                  postId={item.postId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  like={item.like}
                  saved={item.saved}
                  createdDate={item.createdDate}
                  boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'} 
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  setSharedCount={setSharedCount}
                  isOptional={false}
                />
              ))}
            {!likedButtonState && !isContentExist && isLoading && <Loading />}
            {!likedButtonState && !isContentExist && !isLoading && (
              <div className='h-dvh w-full'>{message}</div>
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
                  boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'} 
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  setSharedCount={setSharedCount}
                  isOptional={false}
                />
              ))}
            {likedButtonState &&
              !isLikedPostsContentExist &&
              isLikedPostsLoading && <Loading />}
            {likedButtonState &&
              !isLikedPostsContentExist &&
              !isLikedPostsLoading && <div>{likedPostsMessage}</div>}
            <div ref={bottomRef} className="bottom-0 h-[1px] w-full"></div>
          </div>
        </Suspense>
      </div>
    </>
  );
}
