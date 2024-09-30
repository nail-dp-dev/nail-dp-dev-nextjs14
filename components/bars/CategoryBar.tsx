'use client'

import { CategoryBarProps } from '../../constants/interface';
import MinusSVG from '../../public/assets/svg/minus.svg'
import PlusSVG from '../../public/assets/svg/plus.svg'
import HeartButton from '../animations/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { decreaseBoxes, selectNumberOfBoxes, increaseBoxes, setBoxesForScreenWidth } from '../../store/slices/boxLayoutSlice';
import { selectLoginStatus } from '../../store/slices/loginSlice';
import { useEffect } from 'react';

export default function CategoryBar({elements, category, setCategory}: CategoryBarProps) {

  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) => selectNumberOfBoxes(state));
  const isLoggedIn = useSelector(selectLoginStatus);

  const categoryClick = (e:any, category:string) => {
    e.stopPropagation()
    setCategory(category)
    console.log(category)
  }

  useEffect(() => {
    dispatch(setBoxesForScreenWidth());

    const handleResize = () => {
      dispatch(setBoxesForScreenWidth());
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [dispatch]);

  return  (
    <div className='categoryBar w-full h-[66px] flex flex-col items-start justify-between px-[5px]'>
      <div className='categoryDiv w-full h-[53px] flex items-center justify-between border-b-[1px] border-navBotSolidGray'>
        <div className='h-[53px] flex xs:gap-[20px] gap-[20px] md:gap-[32px]'>
          {elements.map((item, index) => {
            if (item.name === 'For You') {
              return isLoggedIn === 'loggedIn' && (
                <button key={index} onClick={(e)=>{categoryClick(e,item.desc)}} className={`inline-flex h-[100%] transition-all items-center justify-center ${category === item.desc ? 'border-purple' : 'border-navMenuBotSolidGray'} border-b-[3px]`}>
                  <p className='xs:text-[0.785rem] text-[0.83rem] md:text-[0.875rem] font-[700] text-textBlack'>{item.name}</p>
                </button>
              );
            } else {
              return (
                <button key={index} onClick={(e)=>{categoryClick(e,item.desc)}} className={`inline-flex h-[100%] transition-all items-center justify-center ${category === item.desc ? 'border-purple' : 'border-navMenuBotSolidGray'} border-b-[3px]`}>
                  <p className='xs:text-[0.785rem] text-[0.83rem] md:text-[0.875rem] font-[700]'>{item.name}</p>
                </button>
              );
            }
          })}
        </div>
        <div className='flex items-center xs:gap-[13px] sm:gap-[20px] md:gap-[32px]'>
          <button onClick={() => dispatch(increaseBoxes())} disabled={numberOfBoxes >= 7} className='h-[24px] xs:hidden'>
            <MinusSVG />
          </button>
          <button onClick={() => dispatch(decreaseBoxes())} disabled={numberOfBoxes <= 3} className='h-[24px] xs:hidden'>
            <PlusSVG />
          </button>
          {
            isLoggedIn === 'loggedIn' &&
            <HeartButton
              width='29' height='24' isClicked={false} isGetAllLiked={true}
            />
          }
      </div>
      </div>
      <div className='w-full h-[13px]'></div>
    </div>
  )
}
