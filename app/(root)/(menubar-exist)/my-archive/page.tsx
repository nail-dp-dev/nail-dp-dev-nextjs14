'use client'

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import { myArchiveElements } from '../../../../constants/index';
import ListIcon from '../../../../public/assets/svg/my-archive-list.svg'
import AlbumIcon from '../../../../public/assets/svg/my-archive-album.svg'
import LoginSuggestModal from '../../../../components/modal/mini/LoginSuggestModal';
import { getArchiveData } from '../../../../api/archive/getArchiveData';
import ArchiveBox from '../../../../components/boxes/ArchiveBox';


export default function MyArchivePage() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const [category, setCategory] = useState('archive')
  const [archiveData, setArchiveData] = useState<any>([])
  const [showType, setShowType] = useState('album')
  const [loading, setLoading] = useState(false)
  const [isFirstRendering, setIsFirstRendering] = useState(true);

  const clickCategory = (e:any, name:string) => {
    e.stopPropagation()
    setCategory(name)
  }

  const clickShowType = (e:any, type:string) => {
    e.stopPropagation()
    setShowType(type)
  }
  
  const getArchive = async () => {
    const data = await getArchiveData()

    if (data.code === 2000) {
      setArchiveData(data.data.archiveList)
    }
  }

  const clearArchiveData = async () => {
    if(!loading){
      setArchiveData([])
    }
  }

  useEffect(() => {
    setLoading(true)
    console.log('useEffect')
    if (!isFirstRendering && !loading) {
      clearArchiveData()
    }
    if (!loading) {
      getArchive()
      setIsFirstRendering(false)
      setLoading(false)
    }
  },[category])
  
  console.log(isLoggedIn)
  console.log(archiveData)
  
  return (
    isLoggedIn === 'loggedIn' ?
    <div className="MyArchiveContainer w-full h-full flex flex-col px-[5px]">
        <div className='w-full h-[66px] bg-white flex items-start justify-between'>
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
      <div className='w-full relative flex h-full flex-wrap items-start gap-[0.7%] overflow-auto overflow-y-scroll transition-all bg-red'>
        {archiveData.map((item:any, index:any)=>(
          <ArchiveBox archiveId={item.archiveId} photoId={index} photoUrl={item.archiveImgUrl} saved={false} createdDate={undefined} key={index} />
        ))}
      </div>
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
