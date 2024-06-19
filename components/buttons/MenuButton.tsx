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

interface MenuElementsProps{
  icon: string;
  url: string[],
  name: string,
  desc: string,
  isLast: boolean;
}

export default function MenuButton({ icon , url, name, desc, isLast }: MenuElementsProps) {

  const path = usePathname();

  return (
    <div className={`w-full ${!isLast && 'mb-[8px]'} group`}>
      <Link href={url[0]} className={`${url.includes(path)? 'bg-menuLightGray' : ''} w-full h-[40px] flex items-center justify-between py-[12px] px-[8px] rounded-2xl group-hover:bg-purple group-hover:text-white transition-all`}>
        <div className='flex items-center'>
          <div className='flex items-center justify-center w-[36px] h-[24px]'>
            {
              icon === 'HomeIcon' &&
              <HomeIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'MyArchiveIcon' &&
              <MyArchiveIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path) && 'fill-black'}`} />
              }
            {
              icon === 'DesignIcon' &&
              <DesignIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'ReservationIcon' &&
              <ReservationIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            { 
              icon === 'BuyIcon' &&
              <BuyIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'MyPageIcon' &&
              <MyPageIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
              }
            {
              icon === 'SettingIcon' &&
              <SettingIcon className={`menuIcon mr-[12px] fill-transparent stroke-black fill-current group-hover:fill-white  group-hover:stroke-white ${url.includes(path)&& 'fill-black'}`} />
            }
          </div>
          <span className={` text-[14px] ${url.includes(path)? 'font-[700]' : 'font-[500]'}`}>{name}</span>
        </div>
        <span className={`text-[12px] pr-[8px] left-0 font-[700] r-0 hidden group-hover:block text-white`}>{desc}</span>
      </Link>
    </div>
  );
}