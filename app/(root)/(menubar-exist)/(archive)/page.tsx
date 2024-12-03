'use client';

import React, { useEffect, useRef, useState } from 'react';
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

  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);

  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);
  const [category, setCategory] = useState<string>('');
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
  const likedBottomRef = useRef<HTMLDivElement>(null);
  const likedButtonState = useSelector(selectButtonState);

  const fetchMorePosts = async () => {
    const currentCursorId = cursorId;

    let data = await getAllPostsData({
      category,
      size,
      cursorId: currentCursorId,
      isFirstRendering,
    });

    if (
      (data.code === 2000 &&
        data.data.postSummaryList.content.length !== 0 &&
        isLoggedIn === 'loggedIn') ||
      'loggedOut'
    ) {
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

    let data = await getLikedPosts({
      category,
      size,
      cursorLikedId: currentCursorId,
      isLikedPostsFirstRendering,
    });

    if (data.code === 2000 && data.data.postSummaryList.content.length !== 0) {
      setIsLikedPostsLoading(true);
      setCursorLikedId(data.data.cursorId);
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

  const refreshPosts = async () => {
    setCursorId(0);
    setMessage('');
    setIsContentExist(false);
    setPostsData([]);
    setIsFirstRendering(true);
    setIsLoading(true);
    setIsLast(false);
  };

  useEffect(() => {
    if (isLoggedIn === 'loggedIn') {
      setCategory('foryou');
    } else if (isLoggedIn === 'loggedOut') {
      setCategory('trending');
    }
  }, [isLoggedIn]);

  useEffect(() => {
    refreshPosts();
  }, [category]);

  useEffect(() => {
    if (boxRef.current) {
      boxRef.current.scrollTop = 0;
    }
  }, [category, likedButtonState]);

  const urlBase64ToUint8Array = (base64String: string) => {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
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
          isContentExist &&
          !likedButtonState
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
  }, [isLoading, isLast, cursorId, likedButtonState]);

  useEffect(() => {
    if (!likedButtonState) {
      return;
    }

    if (isLikedPostsFirstRendering && likedButtonState) {
      fetchMorePostsByLikedButton();
    }

    const likedButtonCurrentRef = likedBottomRef.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isLikedPostsLast &&
          !isLikedPostsLoading &&
          isLikedPostsContentExist &&
          likedButtonState
        ) {
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
  }, [isLikedPostsLoading, cursorLikedId, isLikedPostsLast, likedButtonState]);

  useEffect(() => {
    if (!likedButtonState) {
      setCursorId(0);
      setMessage('');
      setIsContentExist(false);
      setPostsData([]);
      setIsFirstRendering(true);
      setIsLoading(true);
      setIsLast(false);
    }

    if (likedButtonState) {
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

  const itemsToRender = postsData
    ? postsData.length <= layoutNum
      ? postsData
      : postsData.slice(0, postsData.length - (postsData.length % layoutNum))
    : [];

  useEffect(() => {
    const registerServiceWorker = async () => {
      if ('serviceWorker' in navigator && 'PushManager' in window) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          console.log('Service Worker registered:', registration);

          // VAPID Public Key는 Base64로 변환된 키를 사용합니다.
          const applicationServerKey =
            'BGXt3rdP1Kas3S2P8k5jxzIynme_i5ywPG-6fXhFL6DVkr9XTmGquoPz-_EJ7fEFtF7vbKpdps5X5RyCP7B0mcU';

          // 디바이스 토큰을 재시도하면서 가져오는 함수
          const retryGetDeviceToken = async (
            retries: number,
          ): Promise<void> => {
            try {
              const subscription = await registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey:
                  urlBase64ToUint8Array(applicationServerKey),
              });
              console.log('Push Subscription:', subscription);
              const authKey = subscription.getKey('auth') || new ArrayBuffer(0);
              const p256dhKey =
                subscription.getKey('p256dh') || new ArrayBuffer(0);

              const authBase64 = btoa(
                String.fromCharCode(...Array.from(new Uint8Array(authKey))),
              );
              const p256dhBase64 = btoa(
                String.fromCharCode(...Array.from(new Uint8Array(p256dhKey))),
              );

              await fetch( `${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  endpoint: subscription.endpoint,
                  auth: authBase64,
                  p256dh: p256dhBase64,
                }),
                credentials: 'include',
              });
            } catch (error) {
              if (retries === 0) {
                console.error('최대 재시도 횟수 초과:', error);
                throw error;
              } else {
                console.warn(
                  `getDeviceToken 재시도 중... 남은 횟수: ${retries}`,
                );
                return retryGetDeviceToken(retries - 1);
              }
            }
          };

          // 최대 3번까지 디바이스 토큰 가져오기 시도
          await retryGetDeviceToken(3);
        } catch (error) {
          console.error('Error during Service Worker registration:', error);
        }
      }
    };

    registerServiceWorker();
  }, []);

  return (
    <>
      <CategoryBar
        elements={archiveCategoryElements}
        category={category}
        setCategory={setCategory}
      />
      <div className="ForYouContainer relative h-dvh overflow-hidden">
        <div
          ref={boxRef}
          className={`outBox relative flex h-full flex-wrap ${likedButtonState ? '' : 'items-center'} gap-[0.7%] overflow-auto overflow-y-scroll transition-all`}
        >
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
                boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                setSharedCount={setSharedCount}
                isOptional={true}
                showOnlyShareButton={true}
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
                boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                setSharedCount={setSharedCount}
                isOptional={true}
                showOnlyShareButton={true}
              />
            ))}
          {likedButtonState &&
            !isLikedPostsContentExist &&
            isLikedPostsLoading && <Loading />}
          {likedButtonState &&
            !isLikedPostsContentExist &&
            !isLikedPostsLoading && <div>{likedPostsMessage}</div>}
          {!likedButtonState && !isLast && (
            <div ref={bottomRef} className="h-[1px] w-full"></div>
          )}
          {likedButtonState && !isLikedPostsLast && (
            <div ref={likedBottomRef} className="h-[1px] w-full"></div>
          )}
          {isLast && !likedButtonState && (
            <div className="flex h-[50px] w-full items-center justify-center">
              <span className="text-gray font-[300]">
                {' '}
                마지막 게시글입니다.{' '}
              </span>
            </div>
          )}
        </div>
      </div>
      {isSuggestLoginModalShow && <LoginSuggestModal />}
    </>
  );
}
