'use client';

import { ChangeEvent, useState } from 'react';
import SearchIcon from '../../../../public/assets/svg/search.svg';
import Bits from '../../../../public/assets/svg/bits.svg';
import Plus from '../../../../public/assets/svg/plus.svg';
import Google from '../../../../public/assets/svg/google.svg';
import Kakao from '../../../../public/assets/svg/kakao.svg';
import Naver from '../../../../public/assets/svg/naver.svg';
import Arrow from '../../../../public/assets/svg/arrow-under.svg';
import HashtagArrowIcon from '../../../../public/assets/svg/hashtag-arrow.svg';
import {
  AlarmSettingElements,
  ChatViewElements,
  PaymentElements,
  ScreenThemeElements,
  SettingElements,
  SettingMenuElements,
} from '../../../../constants';
import ThemeToggle from './components/ThemeToggle';
import { setCommonModal } from '../../../../store/slices/modalSlice';
import { useDispatch, useSelector } from 'react-redux';
import useIsMounted from '../../../../hooks/useIsMounted';
import {
  selectDarkMode,
  toggleDarkMode,
} from '../../../../store/slices/themeSlice';

export default function SettingPage() {
  const [isCategoryBar, setIsCategoryBar] = useState('subscribe');
  const [isMenu, setIsMenu] = useState('결제 수단 • 비츠');
  const [isOn, setIsOn] = useState(false);
  const [isPaymentMenu, setIsPaymentMenu] = useState(false);
  const [isPaymentMenuState, setIsPaymentMenuState] =
    useState('버츠 사용 내역');

  const [isPhone, setIsPhone] = useState(false);
  const [isPhoneState, setIsPhoneState] = useState('010-1234-5678');
  const [isEmail, setIsEmail] = useState(false);
  const [isEmailState, setIsEmailState] = useState('qwer@gmail.com');

  const [isAlarm, setIsAlarm] = useState(false);

  const [isChatSetting, setIsChatSetting] = useState(false);
  const [isChatState, setIsChatState] = useState('최신순 (기본정렬)');

  const [isScreenTheme, setIsScreenTheme] = useState(false);

  const darkMode = useSelector(selectDarkMode);
  const isMounted = useIsMounted();

  const dispatch = useDispatch();

  // 버튼을 클릭할 때 상태를 반전시키는 함수
  const handleToggle = () => {
    setIsOn((prevState) => !prevState);
    localStorage.setItem('bets', `${isOn}`);
  };

  const a = [
    {
      payment: 1000,
      type: '비츠',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 1000,
      type: '비츠',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 2000,
      type: '비츠',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 3000,
      type: '계좌',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 4000,
      type: '계좌',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 5000,
      type: '비츠',
      context: '결제상세내용 월간 구독료 월간 구독료 월간 구독료 월간 구독료',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 6000,
      type: '카드',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 7000,
      type: '비츠',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
    {
      payment: 8000,
      type: '카드',
      context: '결제상세내용',
      date: '2024-09-03 15:11:29.808559',
    },
  ];
  const userLogin = [
    { name: 'google', desc: true },
    { name: 'kakao', desc: true },
    { name: 'naver', desc: false },
  ];
  const address = [
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: true,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
    {
      name: 'a',
      phone: '010-1234-5678',
      address: '경기도 가평군 가평읍 가화로 164, 201동 102호(휴먼시아)',
      set: false,
    },
  ];

  const paymentDesc = PaymentElements.find(
    (element) => element.name === isPaymentMenuState,
  )?.desc;

  const CategoryBarClick = (e: any, name: string, menu: string) => {
    e.stopPropagation();
    if (isCategoryBar !== name) {
      setIsCategoryBar(name);
      setIsMenu(menu);
    }
  };

  const MenuBarClick = (e: any, menu: string) => {
    e.stopPropagation();
    setIsMenu(menu);
  };

  const ChangePhone = (e: ChangeEvent<HTMLInputElement>) => {
    setIsPhoneState(e.target.value);
  };

  const ChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setIsEmailState(e.target.value);
  };

  const ClickPhone = () => {
    dispatch(setCommonModal('setting-phone'));
  };

  const ClickEmail = () => {
    dispatch(setCommonModal('setting-email'));
  };

  const addAddress = () => {
    dispatch(setCommonModal('road-address'));
  };

  const alarmToggle = () => {
    setIsAlarm(!isAlarm);
  };

  const chatMenuSetting = () => {
    setIsChatSetting(!isChatSetting);
  };

  const chatMenuClick = (name: string) => {
    setIsChatState(name);
    setIsChatSetting(false);
  };

  const themeMenuSetting = () => {
    setIsScreenTheme(!isScreenTheme);
  };

  const modeToggle = () => {
    dispatch(toggleDarkMode());
    setIsScreenTheme(false);
  };

  const PaymentMenuClick = (name: string) => {
    setIsPaymentMenuState(name);
    setIsPaymentMenu(false);
  };

  const PaymentMenuSetting = () => {
    setIsPaymentMenu(!isPaymentMenu);
  };

  return (
    <div className="SettingContainer h-full w-full overflow-hidden">
      <div className="bg-white py-[16px] dark:bg-themeDark">
        <p className="text-[28px] font-bold text-textBlack dark:text-white">
          환경설정
        </p>
      </div>
      <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
        <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
          <div className="flex h-[53px] gap-[20px] lg:gap-[32px]">
            {SettingElements.map((item, index) => {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    CategoryBarClick(e, item.desc, item.menu);
                  }}
                  className={`inline-flex h-[100%] min-w-[30px] items-center justify-center border-b-[3px] ${isCategoryBar === item.desc ? 'border-purple' : 'border-darkGray'} transition-all`}
                >
                  <p className="text-[10px] font-[700] text-textBlack md:text-[12px] lg:text-[0.875rem]">
                    {item.name}
                  </p>
                </button>
              );
            })}
          </div>
          <div className="relative hidden h-[40px] w-[25%] rounded-full shadow-md lg:flex">
            <input
              className="h-full w-full rounded-full pl-12"
              type="text"
              placeholder="설정 검색"
            />
            <div className="l-0 absolute inset-y-0 flex items-center pl-4">
              <SearchIcon />
            </div>
          </div>
        </div>
        <div className="h-[13px] w-full"></div>
      </div>
      {/* 버튼 메뉴 */}
      <div className={`mb-[20px] flex gap-[20px]`}>
        <div
          className={`flex h-[32px] w-full gap-[20px] text-[14px] font-[700]  ${isCategoryBar == 'alarm' ? 'justify-between' : ''}`}
        >
          {SettingMenuElements.map((item, index) => {
            if (item.desc === isCategoryBar && item.desc !== 'alarm') {
              return (
                <button
                  key={index}
                  onClick={(e) => MenuBarClick(e, `${item.menu}`)}
                  className={`text-[12px] xs:text-[10px]  md:text-[14px] ${
                    isMenu === `${item.menu}`
                      ? 'hashtag-layout button-tr-tf button-transition bg-purple text-white active:bg-darkPurple'
                      : 'hashtag-layout hashtag-hover-active button-tr-tf button-transition bg-lightGray'
                  }`}
                >
                  {item.name}
                </button>
              );
            } else if (item.desc === 'alarm' && isCategoryBar === item.desc) {
              return (
                <>
                  <button
                    key={index}
                    onClick={(e) => MenuBarClick(e, `${item.menu}`)}
                    className={`text-[12px] xs:text-[10px] md:text-[14px] ${
                      isMenu === `${item.menu}`
                        ? 'hashtag-layout button-tr-tf button-transition bg-purple text-white active:bg-darkPurple'
                        : 'hashtag-layout hashtag-hover-active button-tr-tf button-transition bg-lightGray'
                    }`}
                  >
                    {item.name}
                  </button>
                  <div className="flex items-center pr-[33px]">
                    <p className="pr-[20px] text-[14px] md:text-[18px] font-[400] text-textDarkPurple">
                      {`모든 알림 ${isAlarm ? '끄기' : '켜기'}`}
                    </p>
                    <div className="flex">
                      <div
                        className={`flex h-[22px] w-[49px] md:h-[26px] md:w-[53px] cursor-pointer items-center rounded-full border-2 border-lightPurple/80 transition-all duration-300 ${isAlarm ? 'bg-purple' : 'bg-navMenuBotSolidGray'}`}
                        onClick={alarmToggle}
                      >
                        <div
                          className={`h-[20px] w-[20px] md:h-[24px] md:w-[24px] transform rounded-full bg-white shadow-md transition-transform duration-300 ${isAlarm ? 'translate-x-[30px]' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                </>
              );
            }
            return null;
          })}
        </div>
      </div>

      {/* 여기가 변경 */}
      {/* 구독결제 관리 */}
      {isCategoryBar === 'subscribe' && isMenu === '결제 수단 • 비츠' && (
        <div className="flex flex-col">
          <div className="mb-[9px] flex items-center justify-between">
            <p className="ml-[11px] text-[14px] font-[500] text-darkPurple">
              비츠 관리
            </p>
            <div className="mr-[16px] flex items-center">
              <div className="flex">
                <div
                  className={`flex h-[22px] w-[49px] md:h-[26px] md:w-[53px] cursor-pointer items-center  rounded-full border-2 border-lightPurple/80 transition-all duration-300 ${isOn ? 'bg-purple' : 'bg-navMenuBotSolidGray '}`}
                  onClick={handleToggle}
                >
                  <div
                    className={`h-[20px] w-[20px] md:h-[24px] md:w-[24px] transform rounded-full bg-white shadow-md transition-transform duration-300 ${isOn ? 'translate-x-[26px]' : ''}`}
                  />
                </div>
              </div>
              <p
                className={`${isOn ? 'text-purple' : 'text-darkGray'} ml-[10px] text-[12px] md:text-[14px] font-[700]`}
              >
                나의 비츠 잔액 숨기기
              </p>
            </div>
          </div>
          <div className="relative mb-[40px] flex h-[110px] w-full rounded-lg border-2 border-purple">
            <div className="ml-[34px] flex items-center gap-[20px]">
              <Bits className="h-[33px] w-[33px] md:h-[44px] md:w-[44px]" />
              <p className="text-[15px] md:text-[21px] font-[700] text-darkPurple">
                {'1,000'} 비츠
              </p>
            </div>
            <button className="absolute right-[16px] top-[16px] rounded-lg bg-lightPurple/80 px-[12px] py-[4px] text-[12px] md:text-[14px] font-[700] text-darkPurple hover:text-purple">
              자동 충전
            </button>
          </div>
          <div>
            <p className="mb-[9px] ml-[11px] text-[14px] font-[500] text-darkPurple">
              결제 수단 관리
            </p>
            <div className="flex h-[215px] w-full justify-center rounded-lg border-2 border-purple">
              <div className="flex w-full flex-col items-center">
                <p className="pb-[40px] pt-[35px] text-[14px] md:text-[18px] font-[500] text-darkPurple">
                  등록된 결제 수단이 없습니다.
                </p>
                <button className="relative flex h-[50px] w-[220px] md:h-[55px] md:w-[260px] text-[14px] md:text-[18px] items-center justify-center rounded-full bg-lightGray font-[700] text-darkPurple shadow-md">
                  <Plus className="absolute left-[24px]" />
                  <p>결제 수단 추가</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isCategoryBar === 'subscribe' && isMenu === '결제 내역 보기' && (
        <div className="relative flex h-full w-full flex-col">
          <div className="mb-[10px] flex h-[32px] items-center justify-between">
            <p className="ml-[11px] text-[14px] font-[500] text-darkPurple">
              결제 내역
            </p>
            <div className="absolute right-[20px] top-0 min-h-[32px] w-[142px] overflow-hidden rounded-lg border-2 border-purple bg-white opacity-90">
              <button
                onClick={PaymentMenuSetting}
                className="flex h-[32px] w-full items-center justify-between rounded-t-lg bg-white px-[12px] text-[14px] font-[700] text-darkPurple hover:text-purple"
              >
                <p>{isPaymentMenuState}</p>
                <Arrow fill="#F1E8F9" />
              </button>
              {isPaymentMenu &&
                PaymentElements.map((item, index) => {
                  return (
                    isPaymentMenuState !== item.name && (
                      <button
                        key={index}
                        onClick={(e) => PaymentMenuClick(item.name)}
                        className={`flex h-[32px] w-full border-t-2 border-lightPurple  bg-white px-[12px] py-[4px] text-[14px] font-[700] text-darkPurple hover:text-purple`}
                        style={{ top: `${index * 32}px` }}
                      >
                        <p className="pr-[10px]">{item.name}</p>
                      </button>
                    )
                  );
                })}
            </div>
          </div>
          <div className="flex-1">
            <div className="flex h-full flex-col items-center overflow-y-scroll rounded-lg border-2 border-purple transition-all">
              {a.map((item, index) => {
                const date = item.date.split(' ');

                const convertTo12HourFormat = (time: string) => {
                  const [hour, minute] = time.split(':');
                  let period = '오전';
                  let newHour = parseInt(hour, 10);

                  if (newHour >= 12) {
                    period = '오후';
                    if (newHour > 12) newHour -= 12;
                  }

                  if (newHour === 0) newHour = 12;

                  return ` ${period} ${newHour}:${minute}`;
                };

                const formatDate = (date: string) => {
                  const [year, month, day] = date.split('-');

                  return `${year.slice(2)}.${month}.${day}`;
                };

                const formTime = convertTo12HourFormat(date[1]);
                const formDate = formatDate(date[0]);

                return (
                  item.type === paymentDesc && (
                    <div
                      key={index}
                      className="flex min-h-[60px] w-full items-center justify-between border-b-2 border-lightPurple text-[18px]"
                    >
                      <div className="flex w-[20%] min-w-[150px] pl-[17px]">
                        <Bits className="h-[24px] w-[24px]" />
                        <p className="pl-[10px]">{item.payment}</p>
                      </div>
                      <p className="flex-1 text-textDarkPurple">
                        {item.context}
                      </p>
                      <div className="w-[100px]">
                        <p className="text-textDarkPurple">{formTime}</p>
                        <p>{formDate}</p>
                      </div>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
      )}
      {isCategoryBar === 'subscribe' && isMenu === '나의 구독' && (
        <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
          <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
          <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
        </div>
      )}

      {/* 내 계정 */}
      {isCategoryBar === 'myAccount' && isMenu === '내 계정 관리' && (
        <div className="flex flex-col">
          <div className="mb-[9px] flex items-center justify-between">
            <p className="ml-[11px] text-[14px] font-[500] text-darkPurple">
              계정 정보 관리
            </p>
          </div>
          <div className="relative mb-[40px] flex min-h-[300px] w-full flex-col rounded-lg border-2 border-purple">
            <div className="h-full w-full px-[20px] py-[15px]">
              <div className="mb-[20px]">
                <p className="text-[14px] font-[700]">로그인</p>
                <div className="flex flex-wrap">
                  {userLogin.map((item, index) => {
                    if (item.name === 'google' && item.desc) {
                      return (
                        <button
                          key={index}
                          className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-googleGray text-[14px] font-[700]"
                        >
                          <Google />
                          <p>구글 간편 로그인 사용중</p>
                        </button>
                      );
                    }
                    if (item.name === 'kakao' && item.desc) {
                      return (
                        <button
                          key={index}
                          className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-kakaoYellow text-[14px] font-[700]"
                        >
                          <Kakao />
                          <p>카카오 간편 로그인 사용중</p>
                        </button>
                      );
                    }
                    if (item.name === 'naver' && item.desc) {
                      return (
                        <button
                          key={index}
                          className="mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-naverGreen text-[14px] font-[700]"
                        >
                          <Naver />
                          <p>네이버 간편 로그인 사용중</p>
                        </button>
                      );
                    }
                  })}
                </div>
              </div>
              <div className="mb-[20px]">
                <div className="flex w-[200px] justify-between">
                  <p className="text-[14px] font-[700]">이메일</p>
                  <button
                    onClick={ClickEmail}
                    className="text-[9px] text-darkPurple"
                  >
                    변경하기
                  </button>
                </div>
                <div className="h-[50px] w-[200px] rounded-lg bg-lightPurple text-center text-[14px] font-[500] leading-[50px]">
                  {isEmailState}
                </div>
              </div>
              <div>
                <div className="flex w-[200px] justify-between">
                  <p className="text-[14px] font-[700]">휴대폰</p>
                  <button
                    onClick={ClickPhone}
                    className="text-[9px] text-darkPurple"
                  >
                    변경하기
                  </button>
                </div>
                <div className="h-[50px] w-[200px] rounded-lg bg-lightPurple text-center text-[14px] font-[500] leading-[50px]">
                  {isPhoneState}
                </div>
              </div>
            </div>
          </div>
          <div>
            <p className="mb-[9px] ml-[11px] text-[14px] font-[500] text-darkPurple">
              배송지 정보 관리
            </p>
            <div className="flex h-[360px] w-full flex-wrap justify-start gap-[20px] overflow-y-auto rounded-lg border-2 border-purple p-[20px]">
              {address.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex min-h-[122px] w-full flex-col rounded-lg border-2 border-purple px-[17px] py-[10px]"
                  >
                    <div className="flex w-[100%] md:w-[40%] text-[14px]">
                      <p className="mr-[10px] font-[700]">{item.name}</p>
                      <p className="font-[400]">+82 {item.phone}</p>
                    </div>
                    <div className="my-[7px] w-[100%] md:w-[50%]">
                      <p className="font-[500]">{item.address}</p>
                    </div>
                    <div className="flex justify-between">
                      <div className="flex">
                        <input
                          className="mr-[10px]"
                          type="radio"
                          width={16}
                          height={16}
                        />
                        <p>기본주소</p>
                      </div>
                      <div className="flex">
                        <button>삭제</button>
                        <p className="mx-[5px]">|</p>
                        <button>편집</button>
                      </div>
                    </div>
                  </div>
                );
              })}
              {address.length <= 12 && (
                <div className="flex  h-[55px] w-full justify-center">
                  <button
                    onClick={addAddress}
                    className="flex h-full w-[260px] items-center justify-center rounded-full bg-lightGray"
                  >
                    <Plus />
                    <p className="px-[43px]">새 주소 추가</p>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {isCategoryBar === 'myAccount' &&
        isMenu === '간편 로그인 연동 • 해제' && (
          <div className="flex flex-col">
            <div className="mb-[9px] flex items-center justify-between">
              <p className="ml-[11px] text-[14px] font-[500] text-darkPurple">
                계정 정보 관리
              </p>
            </div>
            <div className="relative mb-[40px] flex min-h-[300px] w-full flex-col rounded-lg border-2 border-purple">
              <div className="h-full w-full px-[20px] py-[15px]">
                <div className="mb-[20px]">
                  <p className="text-[14px] font-[700]">연동하기</p>
                  <div className="flex flex-wrap">
                    {userLogin.map((item, index) => {
                      if (item.name === 'google' && !item.desc) {
                        return (
                          <button
                            key={index}
                            className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-googleGray text-[14px] font-[700]"
                          >
                            <Google />
                            <p>구글 간편 로그인 연동</p>
                          </button>
                        );
                      }
                      if (item.name === 'kakao' && !item.desc) {
                        return (
                          <button
                            key={index}
                            className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-kakaoYellow text-[14px] font-[700]"
                          >
                            <Kakao />
                            <p>카카오 간편 로그인 연동</p>
                          </button>
                        );
                      }
                      if (item.name === 'naver' && !item.desc) {
                        return (
                          <button
                            key={index}
                            className="mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-naverGreen text-[14px] font-[700]"
                          >
                            <Naver />
                            <p>네이버 간편 로그인 연동</p>
                          </button>
                        );
                      }
                    })}
                  </div>
                  <p className="mt-[20px] text-[14px] font-[700]">해제하기</p>
                  <div className="flex flex-wrap">
                    {userLogin.map((item, index) => {
                      if (item.name === 'google' && item.desc) {
                        return (
                          <button
                            key={index}
                            className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-googleGray text-[14px] font-[700]"
                          >
                            <Google />
                            <p>구글 간편 로그인 연동 해제</p>
                          </button>
                        );
                      }
                      if (item.name === 'kakao' && item.desc) {
                        return (
                          <button
                            key={index}
                            className="mr-[20px] mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-kakaoYellow text-[14px] font-[700]"
                          >
                            <Kakao />
                            <p>카카오 간편 로그인 연동 해제</p>
                          </button>
                        );
                      }
                      if (item.name === 'naver' && item.desc) {
                        return (
                          <button
                            key={index}
                            className="mt-[10px] flex h-[50px] w-[215px] items-center justify-center gap-[7px] rounded-lg bg-naverGreen text-[14px] font-[700]"
                          >
                            <Naver />
                            <p>네이버 간편 로그인 연동 해제</p>
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      {/* 알람 */}
      {isCategoryBar === 'alarm' && (
        <div className="flex h-full w-full flex-col">
          <div className="max-h-full text-[13px] md:text-[14px] lg:text-[18px] break-keep whitespace-normal">
            <div className="flex h-full flex-col items-center overflow-y-scroll rounded-lg border-2 border-purple transition-all">
              {AlarmSettingElements.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex w-full border-b-2 border-lightPurple pl-[20px]"
                  >
                    <div className="flex h-[67px] w-full items-center">
                      <p className="mr-[20px] font-[700]">{item.name}</p>
                      <p className="font-[300] text-textDarkPurple">
                        {item.desc}
                      </p>
                    </div>
                    <div className="flex items-center pr-[33px]">
                      <div
                        className={`flex h-[22px] w-[49px] md:h-[26px] md:w-[53px] cursor-pointer items-center  rounded-full border-2 border-lightPurple/80 transition-all duration-300 ${isAlarm ? 'bg-purple' : 'bg-navMenuBotSolidGray '}`}
                        onClick={alarmToggle}
                      >
                        <div
                          className={`h-[20px] w-[20px] md:h-[24px] md:w-[24px] transform rounded-full bg-white shadow-md transition-transform duration-300 ${isAlarm ? 'translate-x-[30px]' : ''}`}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* 채팅설정 */}
      {isCategoryBar === 'chat' && isMenu === '채팅방 보기 설정' && (
        <div className="flex flex-col rounded-lg border-2 border-purple">
          <div
            className={`flex min-h-[45px] md:min-h-[55px] w-full items-center justify-between text-[12px] md:text-[14px] font-[700] ${isChatSetting ? 'rounded-lg border-b-2 border-lightPurple' : ''}`}
          >
            <p className="pl-[34px]">{isChatState}</p>
            <button onClick={chatMenuSetting} className="pr-[20px]">
              <HashtagArrowIcon
                className={`fill-current ${isChatSetting ? 'fill-purple' : 'fill-darkPurple'} group-hover:fill-purple`}
              />
            </button>
          </div>
          {isChatSetting &&
            ChatViewElements.map((item, index) => {
              const isLastItem = index === ChatViewElements.length - 1;
              return (
                isChatState !== item.name && (
                  <button
                    key={index}
                    onClick={(e) => chatMenuClick(item.name)}
                    className={`flex min-h-[45px] md:min-h-[55px] w-full items-center justify-between rounded-lg text-[14px] font-[700] hover:bg-lightPurple ${isLastItem ? '' : 'rounded-lg border-b-2 border-lightPurple'} `}
                  >
                    <p className="pl-[34px]">{item.name}</p>
                  </button>
                )
              );
            })}
        </div>
      )}
      {isCategoryBar === 'chat' && isMenu === '채팅 차단 목록' && (
        <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
          <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
          <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
        </div>
      )}

      {/* 테마설정 */}
      {isCategoryBar === 'theme' && isMenu === '화면 테마' && (
        <div className="flex flex-col rounded-lg border-2 border-purple">
          <div
            className={`flex min-h-[45px] md:min-h-[55px] w-full items-center justify-between text-[12px] md:text-[14px] font-[700] ${isScreenTheme ? 'rounded-lg border-b-2 border-lightPurple' : ''}`}
          >
            <p className="pl-[34px]">
              {!darkMode ? '라이트 모드' : '다크 모드'}
            </p>
            <button onClick={themeMenuSetting} className="pr-[20px]">
              <HashtagArrowIcon
                className={`fill-current ${isScreenTheme ? 'fill-purple' : 'fill-darkPurple'} group-hover:fill-purple`}
              />
            </button>
          </div>
          {isScreenTheme &&
            ScreenThemeElements.map((item, index) => {
              const isLastItem = index === ScreenThemeElements.length - 1;
              return (
                ((darkMode && item.name === '라이트 모드') ||
                  (!darkMode && item.name === '다크 모드')) && (
                  <button
                    key={index}
                    onClick={modeToggle}
                    className={`flex min-h-[45px] md:min-h-[55px] w-full items-center justify-between rounded-lg text-[14px] font-[700] hover:bg-lightPurple ${
                      isLastItem
                        ? ''
                        : 'rounded-lg border-b-2 border-lightPurple'
                    }`}
                  >
                    <p className="pl-[34px]">{item.name}</p>
                  </button>
                )
              );
            })}
        </div>
      )}
      {isCategoryBar === 'theme' && isMenu === '채팅방 테마' && (
        <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
          <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
          <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
        </div>
      )}
      {isCategoryBar === 'theme' && isMenu === '스토어 테마' && (
        <div className="flex h-full w-full flex-col items-center justify-center pb-[300px] text-center">
          <p>제작중인 페이지 입니다 12월 중 서비스 런칭 계획중 입니다</p>
          <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
        </div>
      )}

      {/* 언어설정 */}
      {isCategoryBar === 'language' && isMenu === '현재 설정' && (
        <div className="flex flex-col rounded-lg bg-lightPurple">
          <div
            className={`flex min-h-[45px] md:min-h-[55px] w-full items-center justify-between text-[12px] md:text-[14px] font-[700]`}
          >
            <p className="pl-[34px]">한국어 (기본)</p>
            <button className="pr-[20px]">
              <HashtagArrowIcon
                className={`fill-current fill-darkPurple group-hover:fill-purple`}
              />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}