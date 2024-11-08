'use client'

import { rowMenuElements } from "../../constants";
import useLoggedInUserData from '../../hooks/user/useLoggedInUserData';
import { setCommonModal } from '../../store/slices/modalSlice';
import { useAppDispatch } from '../../store/store';
import MenuButton from "../buttons/MenuButton";
import { usePathname, useRouter } from 'next/navigation';
import AlarmIcon from '../../public/assets/svg/alarm-icon.svg'
import AlarmMissIcon from '../../public/assets/svg/alarm-miss-icon.svg'
import Bits from '../../public/assets/svg/bits.svg';
import BitsChargeIcon from '../../public/assets/svg/bits-charge-plus.svg'
import SettingIcon from '../../public/assets/svg/setting.svg'
import Image from 'next/image';
import test from '../../public/assets/img/noArchiveImage.png'

export default function RowMenuBar() {
  const path = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userData, userPointData, userProfileUrl, setUserProfileUrl } =
    useLoggedInUserData();
  
  const handleAlarm = (e: any) => {
    e.stopPropagation()
    dispatch(setCommonModal('alarm-notice'));
    console.log('alarm')
  }

  const clickProfileImage = (e: any) => {
    e.stopPropagation()
    router.push('/my-page')
  }
  
  const clickSettingIcon = (e:any) => {
    e.stopPropagation()
    router.push('/setting')
  }

  return (
    <div className={`${path === '/sign-up' && 'hidden'} xsMenuDiv snap-x snap-mandatory w-full h-[13%] max-h-[80px] flex items-center justify-start overflow-x-auto hide-scrollbar sm:hidden z-40 px-[10px] pb-[10px] gap-[20px]`}>
        <div className="snap-center flex-shrink-0 w-full h-full rounded-[200px] shadow-md shadow-darkGray px-[20px]">
          <div className="menuBarSection w-full h-full md:p-[16px] flex items-center justify-between rounded-[200px] transition-all">
            <div className="w-full h-full flex items-center justify-between gap-[6px] md:gap-[0px] overflow-hidden overflow-x-scroll hide-scrollbar snap-x snap-mandatory rounded-[200px]">
              {rowMenuElements.map((item, index) => (
                <MenuButton
                  key={index}
                  icon={item.icon}
                  name={item.name}
                  url={item.url}
                  desc={item.desc}
                  isLast={item.isLast}
                  where={'row'}
                />
              ))}
            </div>
          </div>
        </div>
        <div className="snap-center flex-shrink-0 w-full h-full rounded-[200px] shadow-md shadow-darkGray px-[20px]">
          <div className="menuBarSection w-full h-full md:p-[16px] flex items-center justify-between rounded-[200px] transition-all">
            <div className="w-full h-full flex items-center justify-between gap-[6px] md:gap-[0px] overflow-hidden overflow-x-scroll hide-scrollbar snap-x snap-mandatory rounded-[200px]">
              <div className='flex items-center gap-[20px]'>
                <button 
                onClick={(e) => { clickProfileImage(e) }}
                className={`{!userData && 'hidden'} w-[40px] h-[40px] rounded-full overflow-hidden`}>
                  {
                    userProfileUrl &&
                      <Image
                        src={userProfileUrl}
                        alt={'profileIamge'}
                        width={40}
                        height={40}
                      />
                  }
                </button>
                <div className='flex items-center justify-center gap-[10px]'>
                  <Bits width={24} height={24}/>
                  <span>{userPointData} 비츠</span>
                  <button>
                    <BitsChargeIcon/>
                  </button>
                </div>
            </div>
            <div className='flex items-center gap-[10px]'>
              <button
                className='w-[40px] h-[40px] rounded-full'
                onClick={(e) => {
                  handleAlarm(e);
                }}
              >
                {
                  true
                  ?
                  <AlarmIcon className='fill-[#b98ce0] hover:fill-[#FFAC31]'/>
                  :
                  <AlarmMissIcon className='fill-[#b98ce0] hover:fill-[#FFAC31]'/>
                }
              </button>
              <button
                className='w-[24px] h-[24px] rounded-full'
                onClick={(e)=>{clickSettingIcon(e)}}
              >
                <SettingIcon/>
              </button>
            </div>
            </div>
          </div>
        </div>
    </div>
  );
}
