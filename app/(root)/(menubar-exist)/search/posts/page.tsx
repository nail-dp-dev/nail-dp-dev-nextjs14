'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import PostBox from '../../../../../components/boxes/PostBox';
import Loading from '../../../../loading';
import LoginSuggestModal from '../../../../../components/modal/mini/LoginSuggestModal';
import { PostSearchResponse } from '../../../../../types/dataType';
import { getPostSearchResults } from '../../../../../api/search/getSearch';
import TagBar from '../../../../../components/bars/TagBar';
import { useSelector } from 'react-redux';
import { selectButtonState } from '../../../../../store/slices/getLikedPostsSlice';
import { selectNumberOfBoxes } from '../../../../../store/slices/boxLayoutSlice';
import SearchNotice from '../../../../../components/notice/SearchNotice';

// 검색 결과 페이지
export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('keyword') || '',
  );
  const [postsData, setPostsData] = useState<
    PostSearchResponse['data']['postSummaryList']['content']
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const [sharedCount, setSharedCount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');
  const isLikedOnly = useSelector(selectButtonState);
  const layoutNum = useSelector(selectNumberOfBoxes);
  const [cursorId, setCursorId] = useState<number | null>(null);
  const [isFetchingMore, setIsFetchingMore] = useState<boolean>(false);
  const [isLastPage, setIsLastPage] = useState<boolean>(false);

  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newKeyword = searchParams.get('keyword') || '';
    setSearchTerm(newKeyword);
    resetSearch();
    fetchSearchResults(newKeyword);
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm) {
      resetSearch();
      fetchSearchResults(searchTerm);
    } else {
      setMessage('검색어가 제공되지 않았습니다.');
      setIsLoading(false);
    }
  }, [searchTerm, isLikedOnly]);

  // 검색 결과 초기화
  const resetSearch = () => {
    setPostsData([]);
    setCursorId(null);
    setIsLastPage(false);
  };

  // 검색 결과 가져오기
  const fetchSearchResults = async (keyword: string, cursor?: number) => {
    if (isLastPage) return;

    setIsLoading(true);
    try {
      const response: PostSearchResponse | null = await getPostSearchResults(
        keyword,
        cursor,
        layoutNum,
      );

      console.log('API 응답:', response);
      console.log('사용된 cursorId:', cursor);

      if (response && response.data && response.data.postSummaryList) {
        let newPosts = response.data.postSummaryList.content;

        if (newPosts.length === 0) {
          setMessage(`'${searchTerm}' 태그를 찾을 수 없습니다.`);
          setIsLastPage(true);
        } else {
          if (isLikedOnly) {
            newPosts = newPosts.filter((post) => post.like);
          }

          setPostsData((prevData) => {
            const postIdSet = new Set(prevData.map((post) => post.postId));
            const uniqueNewPosts = newPosts.filter(
              (post) => !postIdSet.has(post.postId),
            );
            return [...prevData, ...uniqueNewPosts];
          });

          setCursorId(response.data.cursorId);

          if (response.data.postSummaryList.last) {
            setIsLastPage(true);
          } else {
            setIsLastPage(false);
          }

          console.log('다음 cursorId:', response.data.cursorId);
          setMessage('');
        }
      } else {
        setMessage(`'${searchTerm}' 태그를 찾을 수 없습니다.`);
        setIsLastPage(true);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setMessage('검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
      setIsFetchingMore(false);
    }
  };

  // 좋아요 토글 처리
  const handleLikeToggle = (postId: number) => {
    setPostsData((prevPosts) =>
      prevPosts.map((post) =>
        post.postId === postId ? { ...post, like: !post.like } : post,
      ),
    );
  };

  // 검색어에 태그 추가
  const handleTagClick = (tag: string) => {
    const newSearchTerm = searchTerm ? `${searchTerm} ${tag}` : tag;
    const encodedSearchTerm = encodeURIComponent(newSearchTerm);
    router.push(`/search/posts?keyword=${encodedSearchTerm}`);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !isFetchingMore &&
          !isLoading &&
          !isLastPage
        ) {
          setIsFetchingMore(true);
          fetchSearchResults(searchTerm, cursorId ?? undefined);
        }
      },
      {
        threshold: 0.1,
      },
    );

    if (bottomRef.current) {
      observer.observe(bottomRef.current);
    }

    return () => {
      if (bottomRef.current) {
        observer.unobserve(bottomRef.current);
      }
    };
  }, [cursorId, isFetchingMore, searchTerm, isLastPage]);

  const activeTags = searchTerm.split(' ');

  return (
    <>
      <TagBar
        onTagClick={handleTagClick}
        isLikedOnly={isLikedOnly}
        activeTags={activeTags}
        searchTerm={searchTerm}
      />

      {isLoading && postsData.length === 0 ? (
        <Loading />
      ) : message ? (
        <SearchNotice message={message} />
      ) : (
        <div className="relative h-full overflow-y-scroll scrollbar-hide">
          <div className="SearchResultsPageContainer max-h-full">
            <div className="outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all">
              {postsData.map((item, index) => (
                <PostBox
                  key={index}
                  postId={item.postId}
                  photoId={item.photoId}
                  photoUrl={item.photoUrl}
                  isPhoto={item.isPhoto}
                  isVideo={item.isVideo}
                  like={item.like}
                  saved={item.saved}
                  createdDate={item.createdDate}
                  boundary={item.boundary as 'ALL' | 'FOLLOW' | 'NONE'}
                  setIsSuggestLoginModalShow={setIsSuggestLoginModalShow}
                  setSharedCount={setSharedCount}
                  onLikeToggle={() => handleLikeToggle(item.postId)}
                />
              ))}
              <div ref={bottomRef} className="h-[1px] w-full"></div>
            </div>
          </div>
        </div>
      )}
      {isSuggestLoginModalShow && <LoginSuggestModal />}
    </>
  );
}
