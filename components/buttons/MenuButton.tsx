'use client'

import HomeIcon from '../../public/assets/svg/home.svg'
import MyArchiveIcon from '../../public/assets/svg/my-archive.svg'
import DesignIcon from '../../public/assets/svg/design.svg'
import ReservationIcon from '../../public/assets/svg/reservation.svg'
import BuyIcon from '../../public/assets/svg/buy.svg'
import MyPageIcon from '../../public/assets/svg/my-page.svg'
import SettingIcon from '../../public/assets/svg/setting.svg'

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MenuElementsProps } from '../../constants/interface'
import { useSelector } from 'react-redux'
import { selectLoginStatus } from '../../store/slices/loginSlice'


export default function MenuButton({ icon , url, name, desc, isLast, where }: MenuElementsProps) {

  const path = usePathname();
  const isLoggedIn = useSelector(selectLoginStatus);

  return (
    <div className={` ${where === 'row' ? 'w-[50px] h-[50px]' : 'w-[30px] h-[30px]'} md:w-full ${!isLast && where !== 'row' && 'mb-[8px]'} group ${isLoggedIn !== 'loggedIn' && where !== 'row' && (name === '마이 페이지' || name === '환경설정' || name === '내 아카이브') && 'hidden'} transition-all`}>
      <Link href={url[0]} className={`${url.includes(path)? 'bg-menuLightGray' : ''} ${where === 'row' ? 'w-[50px] h-[50px] rounded-full justify-center' : 'w-[30px] h-[30px] justify-between '}  md:w-full md:h-[40px] flex items-center py-[12px] md:px-[8px] rounded-2xl ${where === 'top' ? 'group-hover:bg-purple group-hover:text-white' : 'group-hover:text-purple'} transition-all`}>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-[30px] h-[30px] md:w-[36px] md:h-[24px]'>
            {
              icon === 'HomeIcon' &&
              <HomeIcon className={`menuIcon md:mr-[12px]  stroke-black fill-transparent fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'MyArchiveIcon' &&
              <MyArchiveIcon className={`menuIcon md:mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path) && 'fill-black'}`} />
              }
            {
              icon === 'DesignIcon' &&
              <DesignIcon className={`menuIcon md:mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'ReservationIcon' &&
              <ReservationIcon className={`menuIcon md:mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            { 
              icon === 'BuyIcon' &&
              <BuyIcon className={`menuIcon md:mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'MyPageIcon' &&
              <MyPageIcon className={`menuIcon md:mr-[12px] fill-transparent ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'SettingIcon' &&
              <SettingIcon className={`menuIcon md:mr-[12px] fill-transparent ${url.includes(path)&& 'fill-black'}`} />
            }
          </div>
          <span className={`opacity-0 md:opacity-100 md:text-[14px] ${url.includes(path) ? 'font-[700]' : 'font-[500]'} hidden md:block duration-700 transition-opacity
          `}>{name}</span>
        </div>
        <span className={`opacity-0 md:opacity-100 md:text-[12px] pr-[8px] left-0 font-[700] r-0 md:group-hover:block text-white hidden duration-700 transition-opacity`}>{desc}</span>
      </Link>
    </div>
  );
}