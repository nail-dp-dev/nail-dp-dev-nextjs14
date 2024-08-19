import { useState, useEffect } from 'react';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';

type Item = {
  commentId?: number;
  replyId?: number;
  likeCount: number;
  liked?: boolean;
};

type ThumbsUpCountProps = {
  item: Item;
  onLike: (id: number, increment: number, isReply: boolean) => void;
};

export default function ThumbsUpCount({ item, onLike }: ThumbsUpCountProps) {
  const [isThumbsUpStatus, setIsThumbsUpStatus] = useState(item.liked || false);
  const [isThumbsUpCount, setIsThumbsUpCount] = useState(item.likeCount);

  useEffect(() => {
    console.log('Initial item:', item);
    console.log('Initial liked:', item.liked);
    setIsThumbsUpCount(item.likeCount);
    setIsThumbsUpStatus(item.liked || false);
  }, [item.likeCount, item.liked]);

  const handleThumbsUp = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    const increment = isThumbsUpStatus ? -1 : 1;
    setIsThumbsUpCount(isThumbsUpCount + increment);
    setIsThumbsUpStatus(!isThumbsUpStatus);

    if (item.replyId !== undefined) {
      onLike(item.replyId, increment, true);
    } else if (item.commentId !== undefined) {
      onLike(item.commentId, increment, false);
    }
  };

  return (
    <button className="flex items-center">
      <ThumbsUpIcon
        className={`peer fill-darkPurple
        hover:fill-purple ${isThumbsUpStatus ? 'fill-red' : ''}`}
        onClick={handleThumbsUp}
      />
      <p
        className={`text-14px-normal-dP ml-2 
        peer-hover:text-purple ${isThumbsUpStatus ? 'text-red' : ''}`}
      >
        {isThumbsUpCount}
      </p>
    </button>
  );
}
