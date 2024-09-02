'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PostBox from '../../../../../components/boxes/PostBox';
import Loading from '../../../../loading';
import LoginSuggestModal from '../../../../../components/modal/mini/LoginSuggestModal';
import { PostSearchResponse } from '../../../../../types/dataType';
import { getPostSearchResults } from '../../../../../api/search/getSearch';

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('keyword');

  const [postsData, setPostsData] = useState<
    PostSearchResponse['data']['postSummaryList']['content']
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const [sharedCount, setSharedCount] = useState<number>(0);
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    if (keyword) {
      console.log('입력된 검색어:', keyword); 
      fetchSearchResults(keyword);
    } else {
      setMessage('검색어가 제공되지 않았습니다.');
      setIsLoading(false);
    }
  }, [keyword]);

  // 게시물 검색 결과를 가져오는 함수
  const fetchSearchResults = async (keyword: string) => {
    setIsLoading(true);
    try {
      console.log('서버에 요청을 보낼 키워드:', keyword); 

      const response: PostSearchResponse | null = await getPostSearchResults(keyword);

      if (
        response &&
        response.data &&
        response.data.postSummaryList &&
        response.data.postSummaryList.content.length > 0
      ) {
        setPostsData(response.data.postSummaryList.content);
      } else if (
        response &&
        response.data &&
        response.data.postSummaryList &&
        response.data.postSummaryList.content.length === 0
      ) {
        setMessage('검색 결과가 없습니다.');
      } else {
        setMessage('검색 결과를 가져오는 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setMessage('검색 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="mb-4 text-2xl font-bold">검색 결과</h1>
      {isLoading ? (
        <Loading />
      ) : message ? (
        <p className="text-red-500">{message}</p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
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
            />
          ))}
        </div>
      )}
      {isSuggestLoginModalShow && <LoginSuggestModal />}
    </div>
  );
}


