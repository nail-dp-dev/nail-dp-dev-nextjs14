'use client'

import MinusSVG from '../../public/assets/svg/minus.svg'
import PlusSVG from '../../public/assets/svg/plus.svg'
import HeartButton from '../animations/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decreaseBoxes, selectNumberOfBoxes, increaseBoxes } from '../../store/slice/boxLayoutSlice';

export default function CategoryBar() {

  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) => selectNumberOfBoxes(state));

  return (
    <div className='categoryBar w-full h-[66px] flex flex-col items-start justify-between px-[5px]'>
      <div className='categoryDiv w-full h-[53px] flex items-center justify-between border-b-[1px] border-navBotSolidGray'>
        <div className='h-[53px] flex gap-[32px] items-center justify-start'>
          추천 검색어 컴포넌트
        </div>
        <div className='flex items-center gap-[32px]'>
          <button onClick={() => dispatch(increaseBoxes())} disabled={numberOfBoxes >= 5} className='h-[24px]'>
            <MinusSVG />
          </button>
          <button onClick={() => dispatch(decreaseBoxes())} disabled={numberOfBoxes <= 3} className='h-[24px]'>
            <PlusSVG />
          </button>
          <HeartButton width='29' height='24' isClicked={true} />
      </div>
      </div>
      <div className='w-full h-[13px]'></div>
    </div>
  )
}