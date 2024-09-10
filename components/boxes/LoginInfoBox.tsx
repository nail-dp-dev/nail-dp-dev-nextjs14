'use client';

import Bits from '../../public/assets/svg/bits.svg';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../store/slices/loginSlice';
import ProfileMiniModal from '../modal/mini/ProfileMiniModal';
import { useEffect, useState } from 'react';
import UserInfo from '../ui/UserInfo';
import UserImage from '../ui/UserImage';
import {
  commonModalClose,
  setCommonModal,
} from '../../store/slices/modalSlice';
import { getLogOut } from '../../api/auth/secure/getLogOut';
import useLoggedInUserData from '../../hooks/user/useLoggedInUserData';
import { useAppDispatch } from '../../store/store';
import BitsChargeIcon from '../../public/assets/svg/bits-charge.svg';
import BitsChargeHoverIcon from '../../public/assets/svg/bits-charge-hover.svg';
import EditProfilePencilIcon from '../../public/assets/svg/edit-profile-pencil.svg';

export default function LoginInfoBox() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);
  const [isMiniModalShow, setIsMiniModalShow] = useState<boolean>(false);
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const { userData, userPointData, userProfileUrl, setUserProfileUrl } =
    useLoggedInUserData();

  const handleLogin = () => {
    dispatch(commonModalClose());
    dispatch(setCommonModal('login'));
  };

  const handleLogout = () => {
    getLogOut(dispatch);
  };

  const handleMiniModalToggle = (e: any) => {
    e.stopPropagation();
    setIsMiniModalShow((prev) => !prev);
  };

  const handleModalClose = () => {
    setIsMiniModalShow(false);
  };

  const handleBitsChargeButton = (e: any) => {
    e.stopPropagation();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleModalClose();
      }
    };

    if (isMiniModalShow) {
      window.addEventListener('keydown', handleKeyDown);
    } else {
      window.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className={`loginInfoContainer flex w-full flex-col ${isLoggedIn === 'loggedIn' ? 'h-[85px]' : 'h-[60px]'} transition-all`}
    >
      <div className="loginedDiv relative mb-[2px] flex h-[45px] w-full items-center">
        {isLoggedIn === 'loggedIn' && userData && (
          <>
            <button
              onClick={handleMiniModalToggle}
              className="profileButton relative mr-[12px] h-[40px] w-[40px] overflow-hidden rounded-full"
              disabled={isMiniModalShow}
            >
              <UserImage
                src={userProfileUrl}
                alt={'profileIamge'}
                width={40}
                height={40}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] opacity-0 transition-opacity duration-300 hover:opacity-100">
                <EditProfilePencilIcon />
              </div>
            </button>
            <ProfileMiniModal
              isMiniModalShow={isMiniModalShow}
              setIsMiniModalShow={setIsMiniModalShow}
              setUserProfileUrl={setUserProfileUrl}
            />
          </>
        )}
        {isLoggedIn === 'pending' && !userData && <></>}
        {isLoggedIn === 'loggedOut' && (
          <UserImage
            src={'/assets/img/logoutProfileImage.png'}
            alt={'profileIamge'}
            width={40}
            height={40}
          />
        )}
        {isLoggedIn === 'loggedIn' && userData && (
          <UserInfo
            isMenuBar={true}
            nickname={userData.data.nickname}
            postsCount={userData.data.postsCount}
            saveCount={userData.data.saveCount}
            followerCount={userData.data.followerCount}
          >
            <button
              onClick={() => {
                handleLogout();
              }}
            >
              <span className=" text-[12px] font-[700] text-textDarkPurple underline hover:text-purple">
                로그아웃
              </span>
            </button>
          </UserInfo>
        )}
        {isLoggedIn === 'loggedOut' && (
          <button
            onClick={() => {
              handleLogin();
            }}
            className="flex flex-1 flex-col items-start justify-between  pl-[10px] hover:text-purple"
          >
            <div className=" flex h-full items-center justify-between">
              <span className="text-[16px] font-[700] underline">
                로그인하기
              </span>
            </div>
            <div className="flex w-full flex-1 justify-start gap-[10px] text-sm font-normal">
              <span>로그인하기를 눌러 회원가입 및 로그인</span>
            </div>
          </button>
        )}
      </div>
      {isLoggedIn === 'loggedIn' && (
        <div className="flex h-[38px] w-full items-center justify-between px-[8px]">
          <div className="flex items-center ">
            <Bits className="mr-[12px]" />
            <span className="text-[14px] font-[700] text-textDarkPurple">
              {userPointData} 비츠
            </span>
          </div>
          <button
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={(e) => {
              handleBitsChargeButton(e);
            }}
          >
            {isButtonHovered ? <BitsChargeHoverIcon /> : <BitsChargeIcon />}
          </button>
        </div>
      )}
    </div>
  );
}
