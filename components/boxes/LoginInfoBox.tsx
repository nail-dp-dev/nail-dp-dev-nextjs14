'use client'

import Image from 'next/image'
import Bits from '../../public/assets/svg/bits.svg'
import { userData } from '../../constants/example'
import { userPointData } from '../../constants/example'
import { userProfileImageData } from '../../constants/example'
import Link from 'next/link'

export default function LoginInfoBox() {

  return (
    <div className='loginInfoContainer flex flex-col w-full h-[85px]'>
      <div className='w-full flex items-center h-[45px] mb-[2px]'>
        <Link href={`${process.env.NEXT_PUBLIC_API_URL}/profile_미확정_url/${userData.data.nickname}`}>
          <Image src={`${userProfileImageData.photos[0]['photo_url']}`} width={40} height={40} alt={ 'profileIamge' } className='rounded-full mr-[12px]' />
        </Link>
        <div className='flex-1 flex flex-col items-start justify-between'>
          <p className='font-[500] text-[16px]'>{userData.data.nickname}</p>
          <div className='flex-1 w-full flex justify-start gap-[10px] text-[14px] font-[400]'>
            <span>게시물 {userData.data.point}</span>
            <span>저장됨 {userData.data.saveCount}</span>
            <span>팔로워 {userData.data.followerCount}</span>
          </div>
        </div>
      </div>
      <div className='flex items-center w-full h-[38px] px-[8px]'>
        <Bits className='mr-[12px]' />
        <span className='text-[14px] text-textDarkPurple font-[700]'>{userPointData.data.point} 비츠</span>
      </div>
    </div>
  )
}