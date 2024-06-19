'use client'

import Image from 'next/image'
import Bits from '../../public/assets/svg/bits.svg'
import { userData } from '../../constants/example'
import { userPointData } from '../../constants/example'
import { userProfileImageData } from '../../constants/example'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { logIn, logOut, selectLoginStatus } from '../../store/slice/loginSlice'
import { useAppDispatch } from '../../store/store'

export default function LoginInfoBox() {

  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);

  const handleToggle = () => {
    if (isLoggedIn) {
      dispatch(logOut());
      } else {
      dispatch(logIn());
    }
  };

  return (
    <div className='loginInfoContainer flex flex-col w-full h-[85px]'>
      <div className='loginedDiv w-full flex items-center h-[45px] mb-[2px]'>
        {
          isLoggedIn
            ?
          <Link href={`${process.env.NEXT_PUBLIC_API_URL}/profile_미확정_url/${userData.data.nickname}`}>
            <div className='w-[40px] h-[40px] rounded-full overflow-hidden mr-[12px]'>
              <Image src={`${userProfileImageData.photos[2]['photo_url']}`} width={40} height={40} alt={'profileIamge'} style={{objectFit: 'cover', width: '100%', height: '100%'}} quality={100} sizes='100vw' priority className='rounded-full ' />  
            </div>
          </Link>
          :
          <Image src={'/assets/img/logoutProfileImage.png'} width={40} height={40} alt={'profileIamge'} className='rounded-full mr-[12px]' />
        }
        {
          isLoggedIn ? 
          <div className='flex-1 flex flex-col items-start justify-between'>
            <div className='w-full h-full flex items-center justify-between'>
              <p className='font-[500] text-[16px]'>{userData.data.nickname}</p>
              <button
                onClick={() => {
                  handleToggle()
                }}
              ><span className=' text-textDarkPurple text-[12px] font-[700] underline hover:text-purple'>로그아웃</span></button>
            </div>
            <div className='flex-1 w-full flex justify-start gap-[10px] text-[14px] font-[400]'>
              <span>게시물 {userData.data.point}</span>
              <span>저장됨 {userData.data.saveCount}</span>
              <span>팔로워 {userData.data.followerCount}</span>
            </div>
          </div>          
          : 
          <button
              onClick={() => {
                  handleToggle()
                }}
              className='flex-1 flex flex-col items-start justify-between hover:text-purple'>
            <div className=' h-full flex items-center justify-between'>
              <span className='text-[16px] font-[700] underline'>로그인하기</span>
            </div>
            <div className='flex-1 w-full flex justify-start gap-[10px] text-[14px] font-[400]'>
              <span>로그인하기를 눌러 회원가입 및 로그인</span>
            </div>
          </button>
        }
      </div>
      <div className='flex items-center w-full h-[38px] px-[8px]'>
        <Bits className='mr-[12px]' />
        <span className='text-[14px] text-textDarkPurple font-[700]'>{userPointData.data.point} 비츠</span>
      </div>
    </div>
  )
}