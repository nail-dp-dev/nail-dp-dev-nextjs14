'use client'

import { useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import { myArchiveElements } from '../../../../constants/index';
import ListIcon from '../../../../public/assets/svg/my-archive-list.svg'
import AlbumIcon from '../../../../public/assets/svg/my-archive-album.svg'
import LoginSuggestModal from '../../../../components/modal/mini/LoginSuggestModal';
import ArchiveBox from '../../../../components/boxes/ArchiveBox';
import { getAllArchivesData } from '../../../../api/archive/getArchivesData';
import { ArchiveArray } from '../../../../types/dataType';

export default function MyArchivePage() {

  console.log('MyArchivePage rendered');

  const isLoggedIn = useSelector(selectLoginStatus);
  const [category, setCategory] = useState<string>('archive')
  const [archivesData, setArchivesData] = useState<ArchiveArray[]>([]);
  const [showType, setShowType] = useState('album')
  const [loading, setLoading] = useState(false)
  const [isFirstRendering, setIsFirstRendering] = useState<boolean>(true);
  const [isSuggestLoginModalShow, setIsSuggestLoginModalShow] =
    useState<boolean>(false);
  const [isLast, setIsLast] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [cursorId, setCursorId] = useState<number>(0);
  const [isContentExist, setIsContentExist] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [sharedCount, setSharedCount] = useState<number>(0);

  const boxRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  const fetchMorePosts = async () => {
    const currentCursorId = cursorId;
    let data = await getAllArchivesData({ category, cursorId: currentCursorId });

    console.log(data, 'fetchMorePosts에서의 cursorId')

    console.log('게시글 더 가져오기...')
    if (data.code === 2000 && data.data.postSummaryList.content.length !== 0) {
      setIsLoading(true);
      setCursorId(data.data.cursorId);
      setArchivesData((prev: ArchiveArray[]) => [
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
  
  const refreshPosts = async () => {
    setCursorId(0);
    setMessage('');
    setIsContentExist(false);
    setArchivesData([]);
    setIsFirstRendering(true);
    setIsLoading(true);
    setIsLast(false);
  };

  useEffect(() => {
    refreshPosts();
  }, [category]);

  // 
  useEffect(() => {
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



  const clickCategory = (e: any, name: string) => {
    e.stopPropagation()
    console.log(`Category clicked: ${name}`);  
    setCategory(name)
  }

  const clickShowType = (e: any, type: string) => {
    e.stopPropagation()
    console.log(`Show type clicked: ${type}`);
    setShowType(type)
  }

  
  return (
    isLoggedIn === 'loggedIn' ?
    <div className="MyArchiveContainer w-full h-fit flex flex-col px-[5px] overflow-hidden">
      <div className='w-full h-[66px] bg-white flex items-start justify-start'>
        <div className='flex items-center justify-between w-full h-[54px] border-b-navBotSolidGray border-b-[1px]'>
          <nav className='flex items-center justify-between gap-[32px] h-[54px]'>
              {
                myArchiveElements.map((item, index) => (
                  <button
                    key={index}
                    onClick={(e) => { clickCategory(e, item.name) }}
                    className={`${category === item.name ? 'border-mainPurple' : 'border-navMenuBotSolidGray'} h-[54px] border-b-[3px]   hover:border-mainPurple`}
                  >
                    <span className='text-[0.875rem] text-textBlack font-[700]'>{item.desc}</span>
                  </button>
                ))
            }
          </nav>
          <div className='flex items-center gap-[10px]'>
            <button
              onClick={(e)=>{clickShowType(e,'album')}}
              >
              <AlbumIcon fill={`${showType === 'album' ? '#756982' : '#DADADA'}`}/>
            </button>
            <button
              onClick={(e)=>{clickShowType(e,'list')}}
            >
              <ListIcon fill={`${showType === 'list' ? '#756982' : '#DADADA'}`}/>
            </button>
          </div>
        </div>
      </div>
        {
          showType === 'album' && archivesData ?
            <div className='w-full relative flex flex-1 flex-wrap items-start gap-[0.7%] overflow-auto overflow-y-scroll transition-all'>
              {archivesData.map((item:any, index:any)=>(
                <ArchiveBox
                  key={index}
                  showType={showType}
                  archiveId={item.archiveId}
                  photoId={index}
                  photoUrl={item.archiveImgUrl}
                  saved={false}
                  createdDate={undefined}
                  archiveName={item.archiveName}
                  postCount={item.postCount}
                  initialBoundary={item.boundary} 
                />
              ))}
              <div ref={bottomRef} className="w-full h-[1px]"></div>
            </div>
            :
          showType === 'list' && archivesData ? 
            <div className='w-full relative flex flex-1 flex-wrap items-start gap-[0.7%] overflow-auto overflow-y-scroll transition-all'>
              {archivesData.map((item:any, index:any)=>(
                <ArchiveBox
                  key={index}
                  showType={showType}
                  archiveId={item.archiveId}
                  photoId={index}
                  photoUrl={item.archiveImgUrl}
                  saved={false}
                  createdDate={undefined}
                  archiveName={item.archiveName}
                  postCount={item.postCount}
                  initialBoundary={item.boundary} 
                />
              ))}
              <div ref={bottomRef} className="w-full h-[1px]"></div>
            </div>
              :
            null
        }
      </div>
    :
    isLoggedIn === 'pending' ?
    <div>
      pending...
    </div>
    :
    isLoggedIn == 'loggedOut' &&
    <div>
      로그인이 필요한 페이지입니다.
      <LoginSuggestModal/>
    </div>
  );
}
