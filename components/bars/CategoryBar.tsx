'use client'

import Link from 'next/link';
import { CategoryBarProps } from '../../constants/interface';
import { usePathname } from 'next/navigation';


export default function CategoryBar({elements}: CategoryBarProps) {

  const path = usePathname()

  return (
    <div className='categoryBar w-full h-[66px] flex items-center justify-between'>
      <div className='categoryDiv w-full h-[53px] flex gap-[32px] border-b-[1px] border-navBotSolidGray'>
        {
          elements.map((item, index)=>(
            <Link key={index} href={item.url} className={`inline-flex h-[100%] transition-all items-center justify-center ${path === item.url ? 'border-purple' : 'border-navMenuBotSolidGray' }  border-b-[3px]`}>
              <p className='text-[14px] font-[700]'>{item.name}</p>
            </Link>
          ))
        }
      </div>
      <div className=''>
        dfw
      </div>
    </div>
  )
}