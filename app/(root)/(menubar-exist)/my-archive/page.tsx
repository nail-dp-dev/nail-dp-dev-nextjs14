'use client'

import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';
import { myArchiveElements } from '../../../../constants/index';
import ListIcon from '../../../../public/assets/svg/my-archive-list.svg'
import AlbumIcon from '../../../../public/assets/svg/my-archive-album.svg'

export default function MyArchivePage() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const router = useRouter()
  const [category, setCategory] = useState('archive')
  const [showType, setShowType] = useState('album')

  const clickNav = (e:any, name:string) => {
    e.stopPropagation()
    setCategory(name)
  }

  const clickType = (e:any, type:string) => {
    e.stopPropagation()
    setShowType(type)
  }

  useEffect(() => {
    if (isLoggedIn === 'loggedOut') {
      router.back()
    }
  },[])

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
                      
                      onClick={(e) => { clickNav(e, item.name) }}
                      className={`h-[54px] border-b-[3px] border-navMenuBotSolidGray ${category === item.name && 'border-mainPurple'} hover:border-mainPurple`}
                    >
                      <span className='text-[0.785rem] text-textBlack font-[700]'>{item.desc}</span>
                    </button>
                  ))
              }
            </nav>
            <div className='flex items-center gap-[10px]'>
              <button
                onClick={(e)=>{clickType(e,'album')}}
                >
                <AlbumIcon fill={`${showType === 'album' ? '#756982' : '#DADADA'}`}/>
              </button>
              <button
                onClick={(e)=>{clickType(e,'list')}}
              >
                <ListIcon fill={`${showType === 'list' ? '#756982' : '#DADADA'}`}/>
              </button>
            </div>
          </div>
      </div>
        MyArchiveContainer { category }{ showType }입니다.
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
    </div>
  );
}
