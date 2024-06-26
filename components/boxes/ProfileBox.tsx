'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { profileData } from '../../constants/example';
import { ProfileProps, ProfileUserIdProps } from '../../constants/interface';

export default function Profile({userid}:ProfileUserIdProps) {
    const [isProfile, setIsProfile] = useState<ProfileProps>()
    useEffect(() => {
        setIsProfile(profileData)
      }, [])

  return (
    <div className="profile w-full h-[160px]">
      <div className="w-full h-[128px] flex flex-row my-[16px]">
        <div className="w-[128px] h-[128px] rounded-full">
          <Image
            src={'/assets/img/logoutProfileImage.png'}
            width={128}
            height={128}
            alt={'profileIamge'}
          />
        </div>
        <div className="flex-1 flex flex-col justify-center w-full h-full pl-[16px]">
          <div>
            <p className='text-[22px] font-bold'>{isProfile?.data.nickname}</p>
          </div>
          <div className='flex gap-[10px] text-[14px] font-[400]'>
            <span>게시물{isProfile?.data.postsCount}</span>
            <span>저장됨{isProfile?.data.saveCount}</span>
            <span>팔로워{isProfile?.data.followerCount}</span>
            <span>팔로잉{1}</span>
          </div>
        </div>
        {userid ? <div className='flex flex-col justify-center pr-[18px]'>
            <div className="flex justify-between w-[180px]">
                <button className="w-[84px] h-[32px] rounded-full bg-purple text-white border-2 border-purple hover:bg-white hover:text-purple">팔로우</button>
                <button className="w-[84px] h-[32px] rounded-full bg-black text-white border-2 border-black hover:bg-white hover:text-black">메세지</button>
            </div>
        </div>:<></>}
      </div>
    </div>
  );
}
