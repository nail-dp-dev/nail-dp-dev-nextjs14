'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from '../../../../store/slices/modalSlice';
import SmallLogoMD from '../../../../public/assets/svg/small-logo-md.svg'
import SmallLogoXS from '../../../../public/assets/svg/small-logo-xs.svg'
import CloseIcon from '../../../../public/assets/svg/close.svg';
import UsedLoginPlatformXL from '../../../../public/assets/svg/used_login_platform-xl.svg'
import UsedLoginPlatformMD from '../../../../public/assets/svg/used_login_platform-md.svg'
import UsedLoginPlatformXS from '../../../../public/assets/svg/used_login_platform-xs.svg'
import KakaoIcon from '../../../../public/assets/svg/kakao.svg'
import GoogleIcon from '../../../../public/assets/svg/google.svg'
import NaverIcon from '../../../../public/assets/svg/naver.svg'
import { easyLoginElements } from '../../../../constants';
import { useRouter } from 'next/navigation';

export default function LoginModal() {

  const router = useRouter()
  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);

  const dispatch = useDispatch();
  const handleModalClose = (e:any) => {
    e.stopPropagation()
    dispatch(commonModalClose());
  };

  const routeClick = (e:any,uri: any,data:any) => {
    e.stopPropagation()
    router.push(`${uri}`)
    localStorage.setItem('loggedInPlatform', data)
  }

  let getLoginedBefore = localStorage.getItem('loggedInPlatform')
  
  return (
    whichCommonModal === 'login' &&
    <div className={`commonModal ${!isCommonModalShow && 'hidden'} absolute w-screen h-screen
      
      z-50 flex items-center justify-center pointer-events-auto
      bg-modalBackgroundColor`}>

      <div className='w-[276px] md:w-[382px] xl:w-[600px] h-[184px] md:h-[190px] xl:h-[250px] flex flex-col items-center justify-center border-[1px] rounded-[12px] bg-white border-purple overflow-hidden'>
        <div className='topBar w-full h-[36px] md:h-[40px] xl:h-[55px] flex items-center justify-between pl-[16.81px] pr-[18.27px]  border-b border-navMenuBotSolidGray'>
          <div className='flex items-center gap-[10px]'>
            <SmallLogoMD className='hidden md:block'/>
            <SmallLogoXS className='md:hidden'/>
            <span
              className='font-700 text-[0.875rem] md:text-[1rem] xl:text-[1.125rem] text-purple'
            >로그인하기</span>
          </div>
          <div>
            <button
              onClick={handleModalClose}
            >
              <CloseIcon/>
            </button>
          </div>
        </div>
        <div className='w-full flex-1 xl:px-[44px] xl:pt-[13px] xl:pb-[29px]'>
          <div className='w-full h-full flex flex-col'>
            <div className='w-full h-[112px] flex flex-col px-[16px] py-[12px] '>
              <div className='w-full h-[36px] '>
                <span
                  className='font-[700] text-[0.875rem] md:text-[1rem]'
                >간편 로그인</span>
              </div>
              <div className='w-full h-[52px] flex items-center justify-center gap-[20px] xl:gap-[10px]'>
                {
                  easyLoginElements.map((ele, index) => (
                    <button
                      key={index}
                      onClick={(e) => {routeClick(e, ele.uri, ele.data)  }}
                      className={`w-[54px] h-[54px] md:w-[91px] xl:w-[150px] md:h-[45px] xl:h-[50px] flex items-center justify-center md:gap-[3px] xl:gap-[11px] button-tr button-tr-tf2 ${ele.data === 'kakao' && 'bg-kakaoYellow' || ele.data === 'google' && 'bg-googleGray' || ele.data === 'naver' && 'bg-naverGreen'} rounded-full md:rounded-[5px]`}
                    >
                      {
                        ele.data === 'kakao' && <KakaoIcon /> ||
                        ele.data === 'google' && <GoogleIcon /> ||
                        ele.data === 'naver' && <NaverIcon />
                      }
                      <span className={`font-[600] hidden xl:block text-[0.875rem] ${ele.data === 'naver' && 'text-white'}`}>{ ele.name }</span>
                      <span className={`font-[600] hidden md:block xl:hidden text-[0.875rem] ${ele.data === 'naver' && 'text-white'}`}>{ '로그인' }</span>
                    </button>
                ))
                }
              </div>
            </div>
            <div className='w-full h-[40px] flex items-start justify-center animate-easeInOnly '>
              <UsedLoginPlatformXL
                className={`${getLoginedBefore === null && 'hidden'} ${getLoginedBefore === 'naver' && 'hidden xl:translate-x-[165px] xl:block' ||  getLoginedBefore === 'kakao' && 'hidden xl:translate-x-[-165px] xl:block'}`}
              />
              <UsedLoginPlatformMD
                className={`translate-y-[-5px] ${getLoginedBefore === null && 'hidden'} ${getLoginedBefore === 'naver' && 'hidden md:translate-x-[110px] md:block xl:hidden' ||  getLoginedBefore === 'kakao' && 'hidden md:translate-x-[-110px] md:block xl:hidden'}`}
              />
              <UsedLoginPlatformXS
                className={`translate-y-[-10px] ${getLoginedBefore === null && 'hidden'} ${getLoginedBefore === 'naver' && 'translate-x-[73px] md:hidden' ||  getLoginedBefore === 'kakao' && ' translate-x-[-73px] md:hidden'}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}