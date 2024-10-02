'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../../../store/slices/loginSlice';
import { setCommonModal } from '../../../../../store/slices/modalSlice';

export default function MyArchiveTopBar() {
  
  const isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch()

  const makeNewArchive = (e:any) => {
    e.stopPropagation()
    dispatch(setCommonModal("archive"))
  }

  return (
    isLoggedIn === 'loggedIn' &&
    <div className='makeNewArchiveBar w-full xs:h-[30px] sm:h-[50px] md:h-[72px] px-[5px] flex items-center justify-between'>
      <span className='xs:text-[0.9rem] sm:text-[1.2rem] md:text-[1.75rem] font-[700] text-textBlack'>저장한 네일아트 디자인</span>
        <button
          onClick={(e)=>{makeNewArchive(e)}}
          className='button-color button-layout button-tr-tf hover:button-hover active:button-click w-[155.83px] h-[32px]'>
        <span className='text-[0.875rem]'>새로운 아카이브 만들기</span>
      </button>
    </div>
  )
}