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
import BitsBalloonIcon from '../../public/assets/svg/bits-balloon.svg';
import AlarmIcon from '../../public/assets/svg/alarm-icon.svg';
import AlarmMissIcon from '../../public/assets/svg/alarm-miss-icon.svg';

export default function LoginInfoBox() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useSelector(selectLoginStatus);
  const [isMiniModalShow, setIsMiniModalShow] = useState<boolean>(false);
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  const [isBitsMiniModalShow, setIsBitsMiniModalShow] =
    useState<boolean>(false);
  const { userData, userPointData, userProfileUrl, setUserProfileUrl } =
    useLoggedInUserData();

  const handleLogin = () => {
    dispatch(commonModalClose());
    dispatch(setCommonModal('login'));
  };

  const handleLogout = () => {
    getLogOut(dispatch);
  };

  const handleAlarm = (e: any) => {
    e.stopPropagation();
    dispatch(setCommonModal('alarm-notice'));
    console.log('alarm');
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
    if (isBitsMiniModalShow) {
      setIsBitsMiniModalShow(false);
    }
  };

  const handleBitsPopUpMiniModal = (e: any) => {
    e.stopPropagation();
    setIsBitsMiniModalShow((prev) => !prev);
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
      className={`loginInfoContainer mb-[6px] flex w-[30px] flex-col md:mb-0 md:w-full ${isLoggedIn === 'loggedIn' ? 'md:h-[85px]' : 'md:h-[60px]'} transition-all `}
    >
      <div className="loginedDiv relative flex w-full items-center md:mb-[2px] md:h-[45px]">
        {isLoggedIn === 'loggedIn' && userData && (
          <>
            <button
              onClick={handleMiniModalToggle}
              className="profileButton relative h-[30px] w-[30px] overflow-hidden rounded-full md:mr-[12px] md:h-[40px] md:w-[40px]"
              disabled={isMiniModalShow}
            >
              <div className="hidden md:block">
                <UserImage
                  src={userProfileUrl}
                  alt={'profileIamge'}
                  width={40}
                  height={40}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <EditProfilePencilIcon />
                </div>
              </div>
              <div className="md:hidden">
                <UserImage
                  src={userProfileUrl}
                  alt={'profileIamge'}
                  width={30}
                  height={30}
                />
                <div className="absolute inset-0 flex items-center justify-center bg-[rgba(0,0,0,0.2)] opacity-0 transition-opacity duration-300 hover:opacity-100">
                  <EditProfilePencilIcon />
                </div>
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
          <div>
            <div className="hidden transition-all md:block">
              <UserImage
                src={'/assets/img/logoutProfileImage.png'}
                alt={'profileIamge'}
                width={30}
                height={30}
              />
            </div>
            <button
              className="md:hidden"
              onClick={() => {
                handleLogin();
              }}
            >
              <UserImage
                src={'/assets/img/logoutProfileImage-xs.png'}
                alt={'profileIamge'}
                width={30}
                height={30}
              />
            </button>
          </div>
        )}
        {isLoggedIn === 'loggedIn' && userData && (
          <div className=' hidden md:flex'>
            <UserInfo
              isMenuBar={true}
              nickname={userData.data.nickname}
              postsCount={userData.data.postsCount}
              saveCount={userData.data.saveCount}
              followerCount={userData.data.followerCount}
            >
              <button
                onClick={(e) => {
                  handleAlarm(e);
                }}
              >
                {true ? (
                  <AlarmIcon className="absolute right-0 translate-y-[-20px] fill-[#b98ce0] hover:fill-[#FFAC31]" />
                ) : (
                  <AlarmMissIcon className="absolute right-0 translate-y-[-20px] fill-[#b98ce0] hover:fill-[#FFAC31]" />
                )}
              </button>
            </UserInfo>
          </div>
        )}
        {isLoggedIn === 'loggedOut' && (
          <button
            onClick={() => {
              handleLogin();
            }}
            className="hidden flex-1 flex-col items-start  justify-between pl-[10px] hover:text-purple md:flex"
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
        <div className="mt-[10px] flex h-[38px] w-full items-center justify-center md:mt-0 md:justify-between md:px-[8px]">
          <div className="flex items-center ">
            <div className="hidden md:mr-[12px] md:block">
              <Bits width={24} height={24} />
            </div>
            <div className="flex items-center">
              <button
                className="md:mr-[12px] md:hidden"
                onClick={(e) => handleBitsPopUpMiniModal(e)}
              >
                <Bits width={24} height={24} className="" />
              </button>
              {isBitsMiniModalShow && (
                <div className="relative z-40 translate-x-[5px] translate-y-[-12.5px] md:hidden">
                  <button
                    className="absolute"
                    onClick={(e) => handleBitsChargeButton(e)}
                  >
                    <span className="absolute z-50 translate-x-[-45px] text-[1rem]">
                      {userPointData}비츠
                    </span>
                    <BitsBalloonIcon className="z-40 " />
                  </button>
                </div>
              )}
            </div>
            <span className="hidden text-[14px] font-[700] text-textDarkPurple md:block">
              {userPointData} 비츠
            </span>
          </div>

          {
            // 비츠 충전 기능 구현될 시 주석 제거
            /* <button
            className='hidden md:block hidden'
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            onClick={(e) => {
              handleBitsChargeButton(e);
            }}
          >
            {isButtonHovered ? <BitsChargeHoverIcon /> : <BitsChargeIcon />}
          </button> */
          }
        </div>
      )}
    </div>
  );
}
