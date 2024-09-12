import React from 'react';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Toggle from '../buttons/Toggle';

interface ButtonProps {
  onClick: (e: any) => void;
  showType?: string;
  type: 'heart' | 'plus' | 'toggle';
  isClicked?: boolean;
  showGeneralAction?: boolean;
  position: 'top-left' | 'top-right' | 'bottom-right' | 'nothing';
  width?: string;
  height?: string;
  className?: string;
}

const buttonComponents = {
  heart: (props: any) => <HeartButton {...props} />,
  plus: (props: any) => <PlusButton {...props} />,
  toggle: (props: any) => <Toggle {...props} />,
};

const positionClasses = {
  'top-left': 'left-2 top-2',
  'top-right': 'right-2 top-2',
  'bottom-right': 'bottom-2 right-2',
};

// Box 공통 버튼 위치
export default function BoxCommonButton({
  showType,
  onClick,
  type,
  isClicked,
  showGeneralAction,
  position,
  width,
  height,
  className,
}: ButtonProps) {
  const ButtonComponent = buttonComponents[type];

  return (
    <button
      onClick={onClick}
      className={`${showType !== 'list' && 'absolute'} z-10 ${position !== 'nothing' && positionClasses[position]} ${className}`}
    >
      <ButtonComponent
        width={width}
        height={height}
        isClicked={isClicked}
        showGeneralAction={showGeneralAction}
        className={
          type === 'toggle'
            ? `${showGeneralAction ? 'fill-darkPurple' : showType === 'list' ? 'fill-darkPurple' : 'fill-white'}`
            : ''
        }
      />
    </button>
  );
}
