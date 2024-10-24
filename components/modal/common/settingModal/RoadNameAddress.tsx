'use client';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectCommonModalStatus,
} from '../../../../store/slices/modalSlice';
import DaumPostcode from 'react-daum-postcode';
import Close from '../../../../public/assets/svg/close.svg';

export default function RoadNameAddressModal() {
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );

  const dispatch = useDispatch();
  const [zodecode, setZonecode] = useState('');
  const [address, setAddress] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneNumber1, setIsPhoneNumber1] = useState('');
  const [isPhoneNumber2, setIsPhoneNumber2] = useState('');
  const [isPhoneNumber3, setIsPhoneNumber3] = useState('');

  const themeObj = {
    bgColor: '#FFFFFF',
    pageBgColor: '#FFFFFF',
    postcodeTextColor: '#C05850',
    emphTextColor: '#222222',
  };

  const postCodeStyle = {
    width: '440px',
    height: '450px',
  };

  const completeHandler = (data: { address: any; zonecode: any }) => {
    const { address, zonecode } = data;
    setZonecode(zonecode);
    setAddress(address);
    setIsOpen(false);
  };

  const closeModal = () => {
    dispatch(commonModalClose());
  };

  const toggleHandler = () => {
    setIsOpen((prevOpenState) => !prevOpenState);
  };

  const ChangePhone1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber1(e.target.value);
  };
  const ChangePhone2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber2(e.target.value);
  };
  const ChangePhone3 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsPhoneNumber3(e.target.value);
  };

  return (
    <div
      className={`commonModal ${!isCommonModalShow && 'hidden'} pointer-events-auto absolute z-50 flex h-screen w-screen items-center justify-center bg-modalBackgroundColor`}
    >
      {!isOpen && (
        <div className="flex h-[485px] w-[440px] flex-col items-center overflow-hidden rounded-[20px] border-[1px] border-purple bg-white">
          <div className="flex h-[40px] w-full items-center justify-end pr-[20px] pt-[20px]">
            <button onClick={closeModal}>
              <Close />
            </button>
          </div>
          <div className="mx-[40px] flex flex-1 flex-col">
            <p className="mb-[20px] text-[26px]">등록할 주소를 입력해주세요.</p>
            <div className="mb-[10px]">
              <p className="mb-[10px] text-[14px] text-textDarkPurple">이름</p>
              <div className="flex h-[30px] items-center rounded-lg">
                <input
                  placeholder="주소 별칭을 입력해주세요."
                  className="h-full flex-1 rounded-lg bg-lightGray px-[10px] text-[14px] text-textDarkPurple"
                />
              </div>
            </div>
            <div className="mb-[10px]">
              <p className="mb-[10px] text-[14px] text-textDarkPurple">주소</p>
              <div className="flex h-[30px] items-center rounded-lg">
                <input
                  placeholder="주소 찾기를 눌러주세요."
                  value={address}
                  className="h-full flex-1 rounded-lg bg-lightGray px-[10px] text-[14px] text-textDarkPurple"
                />
                <button
                  onClick={toggleHandler}
                  className="mx-[5px] h-[30px] w-[90px] rounded-lg bg-lightGray text-[11px]"
                >
                  주소 찾기
                </button>
              </div>
            </div>
            <div className="mb-[10px]">
              <p className="mb-[10px] text-[14px] text-textDarkPurple">
                상세 주소
              </p>
              <div className="flex h-[30px] items-center rounded-lg">
                <input
                  placeholder="상세 주소를 입력해주세요."
                  className="h-full flex-1 rounded-lg bg-lightGray px-[10px] text-[14px] text-textDarkPurple"
                />
              </div>
            </div>
            <div>
              <p className="mb-[10px] text-[14px] text-textDarkPurple">
                전화번호
              </p>
              <div className="mb-[10px] flex h-[30px] w-full">
                <input
                  onChange={(e) => ChangePhone1(e)}
                  className="h-[30px] w-[30%] rounded-lg bg-lightPurple text-center"
                  type="text"
                />
                <p className="mx-[5px]">-</p>
                <input
                  onChange={(e) => ChangePhone2(e)}
                  className="h-[30px] w-[30%] rounded-lg bg-lightPurple text-center"
                  type="text"
                />
                <p className="mx-[5px]">-</p>
                <input
                  onChange={(e) => ChangePhone3(e)}
                  className="h-[30px] w-[30%] rounded-lg bg-lightPurple text-center"
                  type="text"
                />
              </div>
            </div>
          </div>
          <div className="w-full px-[20px] ">
            <button className="mb-[24px] h-[60px] w-full rounded-lg bg-lightGray">
              주소 등록 하기
            </button>
          </div>
        </div>
      )}
      {isOpen && (
        <div className="flex h-[485px] w-[440px] flex-col items-center overflow-hidden rounded-[20px] border-[1px] border-purple bg-white">
          <div>
            <div className="flex h-[35px] w-full items-center justify-end pr-[15px]">
              <button onClick={toggleHandler}>
                <Close />
              </button>
            </div>
            <DaumPostcode
              theme={themeObj}
              style={postCodeStyle}
              onComplete={completeHandler}
            />
          </div>
        </div>
      )}
    </div>
  );
}
