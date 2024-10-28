'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectCommonModalStatus,
} from '../../../../store/slices/modalSlice';
import Close from '../../../../public/assets/svg/close.svg';

export default function SettingPhoneModal() {
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );
  const [isPhoneState,setIsPhoneState] = useState("")
  const [isPhoneNumber1, setIsPhoneNumber1] = useState("")
  const [isPhoneNumber2, setIsPhoneNumber2] = useState("")
  const [isPhoneNumber3, setIsPhoneNumber3] = useState("")

  const dispatch = useDispatch();
  
  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const ChangePhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneState(e.target.value)
  }
  const ChangePhone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber1(e.target.value)
  }
  const ChangePhone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber2(e.target.value)
  }
  const ChangePhone3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber3(e.target.value)
  }

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
          <p className="mb-[40px] text-[26px] font-[700] text-textDarkPurple">
            변경하실 전화번호 입력해주세요.
          </p>
          <div className="mb-[30px]">
            <p className="mb-[10px] text-[14px] text-textDarkPurple">
              사용중인 전화번호
            </p>
            <div className="flex items-center h-[30px] w-full rounded-lg bg-lightGray">
              <p className="ml-[10px] text-[14px] text-textDarkPurple">
                010-1234-5678
              </p>
            </div>
          </div>
          <div>
            <p className="mb-[10px] text-[14px] text-textDarkPurple">
              변경할 전화번호
            </p>
            <div className="flex h-[30px] w-full mb-[10px]">
              <input onChange={e => ChangePhone1(e)} className='text-center w-[80px] h-[30px] bg-lightPurple rounded-lg' type="text" />
              <p className='mx-[5px]'>-</p>
              <input onChange={e => ChangePhone2(e)} className='text-center w-[80px] h-[30px] bg-lightPurple rounded-lg' type="text" />
              <p className='mx-[5px]'>-</p>
              <input onChange={e => ChangePhone3(e)} className='text-center w-[80px] h-[30px] bg-lightPurple rounded-lg' type="text" />
              <button className={`${isPhoneNumber1.length == 3 && isPhoneNumber2.length == 4 && isPhoneNumber3.length == 4 ? "bg-darkGray text-textDarkPurple":"bg-lightGray text-darkGray"} ml-[5px] w-[90px] h-[30px] text-[11px] rounded-lg`}>인증 번호 발송</button>
            </div>
            <div className='flex flex-col w-full'>
              <p className='text-[14px] mb-[10px]'>인증번호 입력</p>
              <div className='flex'>
                <input onChange={e => ChangePhoneNumber(e)} className='pl-[10px] w-full h-[30px] bg-lightPurple rounded-lg' type="text" />
                <button className={`${isPhoneNumber1.length == 3 && isPhoneNumber2.length == 4 && isPhoneNumber3.length == 4 ? "bg-darkGray text-textDarkPurple":"bg-lightGray text-darkGray"} ml-[5px] w-[90px] h-[30px] text-[11px] rounded-lg`}>인증 번호 인증</button>
              </div>
            </div>
          </div>
        </div>
        <div className='w-full px-[20px] '>
          <button className={`${isPhoneState.length >= 4 ? "bg-purple text-white":"bg-lightGray text-darkGray"} h-[60px] w-full rounded-lg mb-[24px]`}>
            전화번호 변경하기
          </button>
        </div>
      </div>
    </div>
  );
}
