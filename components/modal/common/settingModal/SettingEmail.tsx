'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectCommonModalStatus,
} from '../../../../store/slices/modalSlice';
import ExclamationMark from '../../../../public/assets/svg/exclamation-mark.svg';
import Close from '../../../../public/assets/svg/close.svg';

export default function SettingEmailModal() {
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );

  const dispatch = useDispatch();
  const [zodecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '360px',
    height: '480px',
  };

  const completeHandler = (data: { address: any; zonecode: any }) => {
    const { address, zonecode } = data;
    console.log(address);
    console.log(zonecode);
    setZonecode(zonecode);
    setAddress(address);
  };

  const closeHandler = (state: any) => {
    // if (state === 'FORCE_CLOSE') {
    //   setIsOpen(false);
    // } else if (state === 'COMPLETE_CLOSE') {
    //   setIsOpen(false);
    // }
  };

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const inputChangeHandler = (_event: any) => {
    // setDetailedAddress(event.target.value);
  };

  return (
    <div
      className={`commonModal ${!isCommonModalShow && 'hidden'} pointer-events-auto absolute z-50 flex h-screen w-screen items-center justify-center bg-modalBackgroundColor`}
    >
      <div className="flex h-[485px] w-[440px] flex-col items-center overflow-hidden rounded-[20px] border-[1px] border-purple bg-white">
        <div className="flex h-[40px] w-full items-center justify-end pr-[20px] pt-[20px]">
          <button onClick={closeModal}>
            <Close />
          </button>
        </div>
        <div className="flex flex-1 flex-col">
          <p className="mb-[50px] text-[26px] font-[700] text-textDarkPurple">
            변경하실 이메일을 입력해주세요.
          </p>
          <div className="mb-[35px]">
            <p className="mb-[10px] text-[14px] text-textDarkPurple">
              사용중인 이메일
            </p>
            <div className="h-[30px]mx-[40px] w-full rounded-lg bg-lightGray">
              <p className="ml-[10px] py-[5px] text-[14px] text-textDarkPurple">
                qwer@gmail.com
              </p>
            </div>
          </div>
          <div>
            <p className="mb-[10px] text-[14px] text-textDarkPurple">
              변경할 이메일
            </p>
            <div className="flex h-[30px] w-full">
              <input
                className="h-[30px] w-[120px] rounded-lg bg-lightPurple"
                type="text"
              />
              <p className="mx-[5px]">@</p>
              <input
                className="h-[30px] w-[120px] rounded-lg bg-lightPurple"
                type="text"
              />
              <button className="ml-[5px] h-[30px] w-[90px] rounded-lg bg-lightGray text-[11px]">
                인증 메일 발송
              </button>
            </div>
          </div>
        </div>
        <div className="w-full px-[20px] ">
          <div className='flex mb-[10px]'>
            <ExclamationMark width={20} hanging={20} fill={'#B98CE0'} />
            <p className="text-[14px] text-purple pl-[6px]">
              등록하신 이메일로 모든 안내 메일이 발송 됩니다.
            </p>
          </div>
          <button className="mb-[24px] h-[60px] w-full rounded-lg bg-lightGray">
            이메일 변경하기
          </button>
        </div>
      </div>
    </div>
  );
}

{
  /* {!isOpen && <div className='flex flex-col w-full '>
          <div>
            <p>name</p>
            <input type="text" />
          </div>
          <div>
            <p>address</p>
            <input type="text" />
            <p>Detailed address</p>
            <input type="text" />
          </div>
          <div>
            <p>phone</p>
            <input type="text" />
          </div>
        </div>}
        {isOpen && (
          <div>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={completeHandler}
              onClose={closeHandler}
            />
          </div>
        )} */
}
