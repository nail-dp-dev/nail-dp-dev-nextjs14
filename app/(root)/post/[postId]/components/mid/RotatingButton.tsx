import { useState } from 'react';
import PostToggleIcon from '../icons/PostToggleIcon';

interface Item {
  commentId: number;
  commentContent: string;
}

interface RotatingButtonProps {
  item: Item;
}

export default function RotatingButton({ item }: RotatingButtonProps) {
  const [isRotated, setIsRotated] = useState(false);

  const handleRotatedToggle = (e: React.SyntheticEvent) => {
    e.stopPropagation();
    setIsRotated(!isRotated);
  };

  return (
    <div
      className="button-tr flex items-center
  rounded-2.5xl  px-2 py-[2px] hover:bg-darkPurple
  hover:bg-opacity-20 "
      onClick={handleRotatedToggle}
      key={item.commentId}
    >
      <p className="text-14px-normal-dP ">
        답글 {item.commentContent.length}개
      </p>
      <PostToggleIcon
        className={` ml-[7px] ${isRotated ? 'rotate-180' : ''}`}
        onClick={handleRotatedToggle}
        onTouchStart={handleRotatedToggle}
      />
    </div>
  );
}
