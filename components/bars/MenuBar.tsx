'use client'

import { usePathname } from 'next/navigation';
import { bottomMenuElements, topMenuElements } from '../../constants';
import MenuButton from '../buttons/MenuButton';
import LoginInfoBox from '../../components/boxes/LoginInfoBox';

export default function MenuBar() {

  const pathName = usePathname()
  
  return (
    <section className='menuBarSection w-[305px] h-full p-[16px] flex flex-col items-center justify-between shadow-black shadow-menu-shadow rounded-[20px] '>
      <div className='w-full  flex flex-col items-center justify-start rounded-2xl'>
        <LoginInfoBox/>
        {
          topMenuElements.map((item, index) => (
            <MenuButton
              key={index}
              icon={item.icon}
              name={item.name}
              url={item.url}
              desc={item.desc}
              isLast={item.isLast}
              path={pathName}
            />
          ))
        }
      </div>
      <div className='w-full rounded-2xl'>
        {
          bottomMenuElements.map((item, index) => (
            <MenuButton
              key={index}
              icon={item.icon}
              name={item.name}
              url={item.url}
              desc={item.desc}
              isLast={item.isLast}
              path={pathName}
            />
          ))
        }
      </div>
    </section>
  )
}