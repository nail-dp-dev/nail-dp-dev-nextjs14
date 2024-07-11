import { useState } from 'react';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';
import { PostsDetailData } from '../../../../../../types/dataType';

type Item = {
  likeCount: number;
};

type ThumbsUpCountProps = {
  item: Item;
};

export default function ThumbsUpCount({ item }: ThumbsUpCountProps) {
  const [isThumbsUpStatus, setIsThumbsUpStatus] = useState(false);
  const [isThumbsUpCount, setIsThumbsUpCount] = useState(item.likeCount);

  const handleThumbsUp = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    if (isThumbsUpStatus) {
      setIsThumbsUpCount(isThumbsUpCount - 1);
    } else {
      setIsThumbsUpCount(isThumbsUpCount + 1);
    }
    setIsThumbsUpStatus(!isThumbsUpStatus);
  };

  return (
    <button className="flex items-center">
      <ThumbsUpIcon
        className={`peer fill-darkPurple hover:fill-purple
        ${isThumbsUpStatus ? 'fill-red' : ''}`}
        onClick={handleThumbsUp}
      />
      <p
        className={`text-14px-normal-dP ml-2 peer-hover:text-purple
      ${isThumbsUpStatus ? 'text-red' : ''}`}
      >
        {isThumbsUpCount}
      </p>
    </button>
  );
}
