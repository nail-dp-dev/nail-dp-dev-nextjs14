'use client';

import Bits from '../../public/assets/svg/bits.svg';
import { userProfileImageData } from '../../constants/example';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../store/slice/loginSlice';
import { useAppDispatch } from '../../store/store';
import ProfileMiniModal from '../modal/mini/ProfileMiniModal';
import { useState } from 'react';
import useUserData from '../../hooks/useUserData';
import UserInfo from '../ui/UserInfo';
import UserImage from '../ui/UserImage';
import { getLogOut } from '../../api/auth/getLogOut';
import { commonModalClose, setCommonModal } from '../../store/slice/modalSlice';
import Loading from '../../app/loading';

export default function LoginInfoBox() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);
  const [isMiniModalShow, setIsMiniModalShow] = useState<boolean>(false);
  const { userData, userPointData } = useUserData();

  const handleLogin = () => {
    dispatch(commonModalClose())
    dispatch(setCommonModal('login'));
  };

  const handleLogout = () => {
    getLogOut(dispatch)
  }

  const handleMiniModalToggle = (e: any) => {
    e.stopPropagation();
    setIsMiniModalShow((prev) => !prev);
  };


  return (
    <div className="loginInfoContainer flex flex-col w-full h-[85px]">
      <div className="loginedDiv relative w-full flex items-center h-[45px] mb-[2px]">
        {isLoggedIn === 'loggedIn' && userData && 
          (
          <>
            <button
              onClick={handleMiniModalToggle}
              className="profileButton w-[40px] h-[40px] rounded-full overflow-hidden mr-[12px]"
            >
              <UserImage src={`${userProfileImageData.photos[2]['photo_url']}`} alt={'profileIamge'} width={40} height={40}/>
            </button>
            <ProfileMiniModal
              isMiniModalShow={isMiniModalShow}
              setIsMiniModalShow={setIsMiniModalShow}
            />
          </>
        )
        }
        {
          isLoggedIn === 'pending' && !userData && 
          <></>
        }
        {
          isLoggedIn === 'loggedOut' && 
          (
            <UserImage src={'/assets/img/logoutProfileImage.png'} alt={'profileIamge'} width={40} height={40}/>
          )
        }
        {
          isLoggedIn === 'loggedIn' && userData &&

          <UserInfo nickname={'somi'} postsCount={10} saveCount={4} followerCount={30}>
              <button
                onClick={() => {
                  handleLogout();
                }}
              >
                <span className=" text-textDarkPurple text-[12px] font-[700] underline hover:text-purple">
                  로그아웃
                </span>
              </button>
          </UserInfo>
        }
        {
          isLoggedIn === 'loggedOut' && userData &&

          <button
            onClick={() => {
              handleLogin();
            }}
            className="flex-1 flex flex-col items-start justify-between  hover:text-purple pl-[10px]"
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
        }
        
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
