'use client'

import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';

export default function MyArchiveTopBar() {
  
  const isLoggedIn = useSelector(selectLoginStatus);

  return (
    isLoggedIn === 'loggedIn' &&
    <div className='makeNewArchiveBar w-full h-[62px] px-[5px] flex items-center justify-between'>
      <span className='text-[1.75rem] font-[700] text-textBlack'>저장한 네일아트 디자인</span>
      <button className='button-color button-layout button-tr-tf hover:button-hover active:button-click w-[155.83px] h-[32px]'>
        <span className='text-[0.875rem]'>새로운 아카이브 만들기</span>
      </button>
    </div>
  )
}