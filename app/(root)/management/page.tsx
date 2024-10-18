'use client';
import Image from 'next/image';
import { ManagementMenu } from '../../../constants';
import { ChangeEvent, useState } from 'react';

interface Account {ID:string,PW:string,count:number}

export default function ManagementPage() {
  const [isID, setIsID] = useState("")
  const [isPW, setIsPW] = useState("")
  const [isLogin, setIsLogin] = useState(false)
  const [isOTP, setIsOTP] = useState(false)
  const [isOTPNumber, setIsOTPNumber] = useState<number>()
  const [isShowPW, setIsShowPW] = useState(false)
  const [isAccount, setIsAccount] = useState<Account[]>([{ID:"qwer",PW:"1234",count:0}])

  //임시 로그인
  
  const findAccountByID = (ID:string) => {
    const foundUser = isAccount.find(account => account.ID === ID);
    return foundUser;
  };

  const account = findAccountByID(isID)

  const idChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIsID(e.target.value)
  }

  const pwChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIsPW(e.target.value)
  }

  const OPTNumberChange = (e:ChangeEvent<HTMLInputElement>) => {
    setIsOTPNumber(+e.target.value)
  }

  //아이디 생성후 첫로그인시 qr코드 띄우고 등록 
  const loginClick = (ID: string, PW: string) => {
    const user = findAccountByID(ID)
    if (user && user.PW === PW) {
      setIsLogin(true)
    }else{
      alert("올바른 아이디 비번을 입력해주세요.")
    }
  }

  const signUpClick = (ID: string, PW: string) => {
    const user = findAccountByID(ID)
    if (user) {
      alert("이미 존재합니다.")
    }else{
      setIsAccount([...isAccount, {ID,PW,count:0}])
    }
  }

  const loginCancel = () => {
    setIsLogin(false)
    setIsID("")
    setIsPW("")
  }

  const LoginSuccessful = () => {
    setIsAccount(isAccount.map(account => account.ID === isID 
      ? { ...account, count: account.count + 1 } 
      : account))
    console.log(isAccount);
    
  }

  const showPW = () => {
    setIsShowPW(!isShowPW)
  }

  const OTPcheck = () => {
    if (isOTPNumber?.toString().length === 6) {
      setIsOTP(true)
    }else{
      alert("올바른 인증번호를 입력해주세요.")
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
        {isLogin && isOTP && (
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
        {/* 로그인 완료 페이지 */}
        {isLogin && isOTP && (
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
              <input onChange={(e) => idChange(e)} className="w-full my-[15px] text-[20px]" placeholder="아이디" type="text" value={isID}/>
              <div className='relative'>
                <input onChange={(e) => pwChange(e)} maxLength={10} className="w-full text-[20px]" placeholder="비밀번호" type={isShowPW ? "text" : "password"} value={isPW}/>
                <button onClick={showPW} className='absolute top-1/2 right-1 transform -translate-y-1/2 w-[28px] h-[28px] bg-white'>
                  <Image color={isShowPW ? "gray":"black"} width={20} height={20} src={'/assets/img/eyePW.png'} alt={'비번표시'}></Image>
                </button>
              </div>
              <div className='flex justify-between my-auto'>
                <button onClick={e => loginClick(isID,isPW)} className="w-[45%] h-[30px] bg-white">로그인</button>
                <button onClick={e => signUpClick(isID,isPW)} className="w-[45%] h-[30px] bg-white">회원가입</button>
              </div>
            </div>}
            {isLogin && account?.count === 0 &&
            <div className='flex flex-col items-center px-[15px]'>
              <p className='text-[20px] py-[10px]'>2단계인증설정</p>
              <p className='pb-[10px]'>휴대폰에 모바일 인증앱 Google Authenticator 또는 Microsoft Authenticator를 설치한 뒤, 앱아래 QR코드를 스캔해주세요.</p>
              <Image width={300} height={300} src={'/assets/img/QRCODE.png'} alt={'임시이미지'}></Image>
              <p className='py-[10px]'>인증 앱에서 설정이 완료되면 '다음'을 클릭합니다.</p>
              <button className='w-full h-[30px] bg-purple mb-[10px]' onClick={LoginSuccessful}>다음</button>
              <button className='w-full h-[30px] bg-purple mb-[10px]' onClick={loginCancel}>취소</button>
            </div>
            }
            {isLogin && (account?.count ?? 0) > 0 &&
            <div className='flex flex-col items-center px-[40px]'>
              <p className='text-[20px] py-[10px]'>2단계 인증 설정</p>
              <p className='pb-[10px]'>앱에 표시된 6자리 코드를 입력하세요.</p>
              <input onChange={e => OPTNumberChange(e) } className='w-full text-[20px]' type="text" pattern="[0-9]+" maxLength={6}/>
              <button onClick={OTPcheck} className='w-full h-[30px] bg-purple my-[10px]'>다음</button>
            </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
}
