'use client';

import Image from 'next/image';
import Bits from '../../public/assets/svg/bits.svg';
import { userProfileImageData } from '../../constants/example';
import { useSelector } from 'react-redux';
import { logIn, logOut, selectLoginStatus } from '../../store/slice/loginSlice';
import { useAppDispatch } from '../../store/store';
import ProfileMiniModal from '../modal/mini/ProfileMiniModal';
import { useState } from 'react';
import useUserData from '../../hooks/useUserData';

export default function LoginInfoBox() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);
  const [isMiniModalShow, setIsMiniModalShow] = useState<boolean>(false);
  const { userData, userPointData } = useUserData();

  const handleToggle = () => {
    isLoggedIn ? dispatch(logOut()) : dispatch(logIn());
  };

  const handleMiniModalToggle = (e: any) => {
    e.stopPropagation();
    setIsMiniModalShow((prev) => !prev);
  };

  return (
    <div className="loginInfoContainer flex flex-col w-full h-[85px]">
      <div className="loginedDiv relative w-full flex items-center h-[45px] mb-[2px]">
        {isLoggedIn && userData ? (
          <>
            <button
              onClick={handleMiniModalToggle}
              className="profileButton w-[40px] h-[40px] rounded-full overflow-hidden mr-[12px]"
            >
              <Image
                src={`${userProfileImageData.photos[2]['photo_url']}`}
                width={40}
                height={40}
                alt={'profileIamge'}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                quality={100}
                sizes="100vw"
                priority
                className="rounded-full "
              />
            </button>
            <ProfileMiniModal
              isMiniModalShow={isMiniModalShow}
              setIsMiniModalShow={setIsMiniModalShow}
            />
          </>
        ) : (
          <Image
            src={'/assets/img/logoutProfileImage.png'}
            width={40}
            height={40}
            alt={'profileIamge'}
            className="rounded-full mr-[12px]"
          />
        )}
        {isLoggedIn ? (
          userData && (
            <div className="flex-1 flex flex-col items-start justify-between">
              <div className="w-full h-full flex items-center justify-between">
                <p className="font-[500] text-[16px]">
                  {userData.data.nickname}
                </p>
                <button
                  onClick={() => {
                    handleToggle();
                  }}
                >
                  <span className=" text-textDarkPurple text-[12px] font-[700] underline hover:text-purple">
                    로그아웃
                  </span>
                </button>
              </div>
              <div className="flex-1 w-full flex justify-start gap-[10px] text-darkPurple text-sm font-normal">
                <span>게시물 {userData.data.point}</span>
                <span>저장됨 {userData.data.saveCount}</span>
                <span>팔로워 {userData.data.followerCount}</span>
              </div>
            </div>
          )
        ) : (
          <button
            onClick={() => {
              handleToggle();
            }}
            className="flex-1 flex flex-col items-start justify-between  hover:text-purple"
          >
            <div className=" h-full flex items-center justify-between">
              <span className="text-[16px] font-[700] underline">
                로그인하기
              </span>
            </div>
            <div className="flex-1 w-full flex justify-start gap-[10px] text-sm font-normal">
              <span>로그인하기를 눌러 회원가입 및 로그인</span>
            </div>
          </button>
        )}
      </div>
      <div className="flex items-center w-full h-[38px] px-[8px]">
        <Bits className="mr-[12px]" />
        <span className="text-[14px] text-textDarkPurple font-[700]">
          {userPointData} 비츠
        </span>
      </div>
    </div>
  );
}
