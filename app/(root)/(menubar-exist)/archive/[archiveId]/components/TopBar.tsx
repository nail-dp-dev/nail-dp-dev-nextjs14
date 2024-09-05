'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../../../../store/slices/loginSlice';
import { setCommonModal } from '../../../../../../store/slices/modalSlice';
import { useRouter } from 'next/navigation';
import BackIcon from '../../../../../../public/assets/svg/back.svg'


export default function DetailArchiveTopBar() {
  
  const isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch()
  const router = useRouter()

  const makeNewArchive = (e:any) => {
    e.stopPropagation()
    dispatch(setCommonModal("archive"))
  }

  const back = (e:any) => {
    e.stopPropagation()
    router.back()
  }

  return (
    isLoggedIn === 'loggedIn' &&
    <div className='makeNewArchiveBar w-full h-[72px] px-[5px] flex items-center justify-between'>
        <button
          onClick={(e)=>{back(e)}}
          className='flex items-center gap-[16px]'
        >
          <BackIcon/>
          <span className='text-[1.75rem] font-[700] text-textBlack'>
            내아카이브
          </span>
        </button>
        <button
          onClick={(e)=>{makeNewArchive(e)}}
          className='button-color button-layout button-tr-tf hover:button-hover active:button-click w-[155.83px] h-[32px]'>
        <span className='text-[0.875rem]'>새로운 아카이브 만들기</span>
      </button>
    </div>
  )
}