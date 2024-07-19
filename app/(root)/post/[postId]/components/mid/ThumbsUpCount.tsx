import { useState, useEffect } from 'react';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';

type Item = {
  commentId: number;
  likeCount: number;
};

type ThumbsUpCountProps = {
  item: Item;
  onLike: (commentId: number, increment: number) => void;
};

export default function ThumbsUpCount({ item, onLike }: ThumbsUpCountProps) {
  const [isThumbsUpStatus, setIsThumbsUpStatus] = useState(false);
  const [isThumbsUpCount, setIsThumbsUpCount] = useState(item.likeCount);

  useEffect(() => {
    setIsThumbsUpCount(item.likeCount);
  }, [item.likeCount]);

  const handleThumbsUp = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    const increment = isThumbsUpStatus ? -1 : 1;
    setIsThumbsUpCount(isThumbsUpCount + increment);
    setIsThumbsUpStatus(!isThumbsUpStatus);
    onLike(item.commentId, increment);
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
