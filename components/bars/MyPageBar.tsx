'use client';

import { CategoryBarProps } from '../../constants/interface';
import MinusSVG from '../../public/assets/svg/minus.svg';
import PlusSVG from '../../public/assets/svg/plus.svg';
import HeartButton from '../animations/HeartButton';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
  decreaseBoxes,
  selectNumberOfBoxes,
  increaseBoxes,
} from '../../store/slices/boxLayoutSlice';
import { selectLoginStatus } from '../../store/slices/loginSlice';

export default function MyPageBar({
  elements,
  category,
  setCategory,
}: CategoryBarProps) {
  const dispatch = useDispatch();
  const numberOfBoxes = useSelector((state: RootState) =>
    selectNumberOfBoxes(state),
  );
  const isLoggedIn = useSelector(selectLoginStatus);

  const categoryClick = (e: any, category: string) => {
    e.stopPropagation();
    setCategory(category);
    console.log(category);
  };

  return (
    <div className="categoryBar flex h-[66px] w-full flex-col items-start justify-between px-[5px]">
      <div className="categoryDiv flex h-[53px] w-full items-center justify-between border-b-[1px] border-navBotSolidGray">
        <div className="flex h-[53px] gap-[32px]">
          {elements.map((item, index) => {
            if (item.name === 'For You') {
              return (
                isLoggedIn === 'loggedIn' && (
                  <button
                    key={index}
                    onClick={(e) => {
                      categoryClick(e, item.desc);
                    }}
                    className={`inline-flex h-[100%] items-center justify-center transition-all ${category === item.desc ? 'border-purple' : 'border-navMenuBotSolidGray'} border-b-[3px]`}
                  >
                    <p className="text-[0.875rem] font-[700] text-textBlack">
                      {item.name}
                    </p>
                  </button>
                )
              );
            } else {
              return (
                <button
                  key={index}
                  onClick={(e) => {
                    categoryClick(e, item.desc);
                  }}
                  className={`inline-flex h-[100%] items-center justify-center transition-all ${category === item.desc ? 'border-purple' : 'border-navMenuBotSolidGray'} border-b-[3px]`}
                >
                  <p className="text-[14px] font-[700]">{item.name}</p>
                </button>
              );
            }
          })}
        </div>
        <div className="flex items-center gap-[32px]">
          <button
            onClick={() => dispatch(increaseBoxes())}
            disabled={numberOfBoxes >= 7}
            className="h-[24px]"
          >
            <MinusSVG />
          </button>
          <button
            onClick={() => dispatch(decreaseBoxes())}
            disabled={numberOfBoxes <= 3}
            className="h-[24px]"
          >
            <PlusSVG />
          </button>
          {isLoggedIn === 'loggedIn' && (
            <HeartButton
              width="29"
              height="24"
              isClicked={false}
              isGetAllLiked={true}
            />
          )}
        </div>
      </div>
      <div className="h-[13px] w-full"></div>
    </div>
  );
}
