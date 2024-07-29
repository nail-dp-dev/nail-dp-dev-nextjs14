// BoxCommonButton.tsx
import React from 'react';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Toggle from '../buttons/Toggle';

interface ButtonProps {
  onClick: () => void;
  type: 'heart' | 'plus' | 'toggle';
  isClicked?: boolean;
  showGeneralAction?: boolean;
  position: 'top-left' | 'top-right' | 'bottom-right';
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

const BoxCommonButton: React.FC<ButtonProps> = ({
  onClick,
  type,
  isClicked,
  showGeneralAction,
  position,
  width,
  height,
  className,
}) => {
  const ButtonComponent = buttonComponents[type];
  return (
    <button onClick={onClick} className={`absolute z-10 ${positionClasses[position]} ${className}`}>
      <ButtonComponent
        width={width}
        height={height}
        isClicked={isClicked}
        className={type === 'toggle' ? `${showGeneralAction ? 'fill-purple' : 'fill-white'}` : ''}
      />
    </button>
  );
};

export default BoxCommonButton;
