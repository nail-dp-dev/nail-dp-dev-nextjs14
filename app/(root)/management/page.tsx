'use client';
import Image from 'next/image';
import { ManagementMenu } from '../../../constants';
import { ChangeEvent, useState } from 'react';

export default function ManagementPage() {
  const [isID, setIsID] = useState("")
  const [isPassword, setIsPassword] = useState("")
  const [isLogin, setIsLogin] = useState(false)

  //임시 로그인
  const account = {ID:"qwer",PW:"1234",count:0}

  const idChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIsID(e.target.value)
  }

  const pwChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIsPassword(e.target.value)
  }

  //아이디 생성후 첫로그인시 qr코드 띄우고 등록 
  const loginClick = (ID: string, PW: string) => {
    if (account.ID === ID && account.PW === PW) {
      setIsLogin(true)
    }else{
      alert("올바른 아이디 비번을 입력해주세요.")
    }
  }

  return (
    <div>
      <div className="managementTop flex h-[60px] w-full justify-between bg-black px-[15px] text-white">
        <div className="flex py-[15px]">
          <Image
            src={'/assets/img/logoutProfileImage-xs.png'}
            width={30}
            height={30}
            alt="Profile Icon"
          />
          <p className="pl-[20px] text-[21px] font-bold">
            네디플 관리자 페이지
          </p>
        </div>
        {false && (
          <div className="flex items-center">
            <button className="mr-[20px] rounded-xl border-2 border-darkPurple">
              <p className="px-[13px] py-[5px] text-[16px]">CS센터</p>
            </button>
            <p className="mr-[23px]">Login Id</p>
            <Image
              className="rounded-full"
              width={30}
              height={30}
              src={'/assets/img/profile/basic/basic_1.png'}
              alt={'프로필 이미지'}
            ></Image>
          </div>
        )}
      </div>
      <div>
        {false && (
          <div className="flex h-full w-[375px] flex-col">
            <div className="flex h-[44px] w-full text-[14px] leading-[44px] text-purple">
              <p>일반사용자</p>
              <p>비즈니스</p>
              <div className="flex items-center justify-center">
                <p>모바일</p>
                <label className="inline-flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    value=""
                    className="peer sr-only"
                    checked
                  />
                  <div className="bg-gray-200 dark:bg-gray-700 after:border-gray-300 dark:border-gray-600 peer relative h-[30px] w-[60px] rounded-full after:absolute after:start-[2px] after:top-[2.5px] after:h-[25px] after:w-[25px] after:rounded-full after:border-4 after:bg-white after:transition-all after:content-[''] peer-checked:after:translate-x-full peer-checked:after:border-purple rtl:peer-checked:after:-translate-x-full"></div>
                </label>
                <p>웹</p>
              </div>
            </div>
            <div className="bg-managementMenuBackGray h-[calc(100vh-104px)] w-full overflow-y-scroll">
              {ManagementMenu.map((item, index) => {
                return (
                  <button
                    key={index}
                    className={`h-[44px] w-full px-[28px] ${item.type !== 'menu' && 'hover:bg-purple hover:text-white'}`}
                  >
                    <div className="flex justify-between">
                      <p
                        className={`text-[14px] font-[700] ${item.type === 'menu' && 'text-purple'}`}
                      >
                        {item.name}
                      </p>
                      <p className="text-managementMenuTextGray text-[14px] font-[400]">
                        {item.desc}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex h-screen w-full items-center justify-center">
          <div className={`flex w-[30%] ${!isLogin ? "h-[25%]":""} -translate-y-[60px] transform flex-col items-center bg-darkGray font-bold`}>
            <p className="w-full h-[60px] text-[25px] leading-[60px] bg-black text-white text-center">로그인</p>
            {!isLogin && <div className='flex flex-col justify-between px-[40px] w-full h-full'>
              <input onChange={(e) => idChange(e)} className="w-full my-[15px] text-[20px]" placeholder="아이디" type="text" />
              <input onChange={(e) => pwChange(e)} className="w-full mb-[15px] text-[20px]" placeholder="비밀번호" type="text" />
              <button onClick={e => loginClick(isID,isPassword)} className="w-full h-[30px] my-auto bg-white">로그인</button>
            </div>}
            {/* {isLogin && account.count === 0 &&
            <div className='flex flex-col items-center px-[15px]'>
              <p className='text-[20px] py-[10px]'>2단계인증설정</p>
              <p>휴대폰에 모바일 인증앱 Google Authenticator 또는 Microsoft Authenticator를 설치한 뒤, 앱아래 QR코드를 스캔해주세요.</p>
              <p className='w-[300px] h-[300px] py-[10px]'>QR코드 이미지</p>
              <p className='pb-[10px]'>인증 앱에서 설정이 완료되면 '다음'을 클릭합니다.</p>
              <button className='w-full h-[30px] bg-purple mb-[10px]'>다음</button>
              <button className='w-full h-[30px] bg-purple mb-[10px]'>취소</button>
            </div>
            } */}
            {isLogin && account.count === 0 &&
            <div className='flex flex-col items-center px-[40px]'>
              <p className='text-[20px] py-[10px]'>2단계 인증 설정</p>
              <p className='pb-[10px]'>앱에 표시된 6자리 코드를 입력하세요.</p>
              <input className='w-full text-[20px]' type="text" pattern="[0-9]+" maxLength={6}/>
              <button className='w-full h-[30px] bg-purple my-[10px]'>다음</button>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
