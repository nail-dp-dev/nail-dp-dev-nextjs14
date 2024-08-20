'use client'

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import { myArchiveElements } from '../../../../constants/index';
import ListIcon from '../../../../public/assets/svg/my-archive-list.svg'
import AlbumIcon from '../../../../public/assets/svg/my-archive-album.svg'
import LoginSuggestModal from '../../../../components/modal/mini/LoginSuggestModal';
import ArchiveBox from '../../../../components/boxes/ArchiveBox';

export default function MyArchivePage() {

  console.log('MyArchivePage rendered');  // 컴포넌트가 렌더링될 때마다 로그 출력

  const isLoggedIn = useSelector(selectLoginStatus);
  const [category, setCategory] = useState('archive')
  const [archiveData, setArchiveData] = useState<any>([])
  const [showType, setShowType] = useState('album')
  const [loading, setLoading] = useState(false)
  const [isFirstRendering, setIsFirstRendering] = useState(true);

  console.log(archiveData)

  const clickCategory = (e: any, name: string) => {
    e.stopPropagation()
    console.log(`Category clicked: ${name}`);  // 카테고리 버튼 클릭 시 로그 출력
    setCategory(name)
  }

  const clickShowType = (e: any, type: string) => {
    e.stopPropagation()
    console.log(`Show type clicked: ${type}`);  // 보기 방식 버튼 클릭 시 로그 출력
    setShowType(type)
  }

  useEffect(() => {
    console.log('useEffect triggered by category change:', category);
    setLoading(true);

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/archive`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
      })
      .then(res => res.json())
      .then(res => {
        if (res.code === 2000) {
          setArchiveData(res.data.archiveList);
          console.log('Data fetched:', res.data.archiveList);
        }
      })
      .catch(error => {
        console.error('Error fetching archive data:', error);
      })
      .finally(() => {
        setIsFirstRendering(false);
        setLoading(false);
        console.log('Loading completed');
      });
  }, [category]);

  
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
          showType === 'album' &&
          <div className='w-full relative flex flex-1 flex-wrap items-start gap-[0.7%] overflow-auto overflow-y-scroll transition-all'>
            {archiveData.map((item:any, index:any)=>(
              <ArchiveBox key={index} showType={showType} archiveId={item.archiveId} photoId={index} photoUrl={item.archiveImgUrl} saved={false} createdDate={undefined} archiveName={item.archiveName} postCount={item.postCount} />
            ))}
          </div>
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
