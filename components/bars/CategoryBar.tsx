'use client'

import Link from 'next/link';
import { CategoryBarProps } from '../../constants/interface';
import { usePathname } from 'next/navigation';
import MinusSVG from '../../public/assets/svg/minus.svg'
import PlusSVG from '../../public/assets/svg/plus.svg'
import HeartButton from '../animations/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decreaseBoxes, selectNumberOfBoxes, increaseBoxes } from '../../store/slice/boxLayoutSlice';

export default function CategoryBar({elements}: CategoryBarProps) {

  const path = usePathname()
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) => selectNumberOfBoxes(state));


  return (
    <div className='categoryBar w-full h-[66px] flex items-start justify-between'>
      <div className='categoryDiv w-full h-[53px] flex items-center justify-between border-b-[1px] border-navBotSolidGray'>
        <div className='h-[53px] flex gap-[32px]'>
        {
          elements.map((item, index)=>(
            <Link key={index} href={item.url} className={`inline-flex h-[100%] transition-all items-center justify-center ${path === item.url ? 'border-purple' : 'border-navMenuBotSolidGray' }  border-b-[3px]`}>
              <p className='text-[14px] font-[700]'>{item.name}</p>
            </Link>
          ))
        }
        </div>
        <div className='flex items-center gap-[32px]'>
          <button onClick={() => dispatch(increaseBoxes())} disabled={numberOfBoxes >= 5}>
            <MinusSVG />
          </button>
          <button onClick={() => dispatch(decreaseBoxes())} disabled={numberOfBoxes <= 3}>
            <PlusSVG />
          </button>
          <HeartButton width='29' height='24'/>
      </div>
      </div>
    </div>
  )
}