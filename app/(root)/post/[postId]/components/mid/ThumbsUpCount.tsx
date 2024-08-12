import { useState, useEffect } from 'react';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';

type Item = {
  commentId?: number;
  replyId?: number;
  likeCount: number;
};

type ThumbsUpCountProps = {
  item: Item;
  // isReply: 댓글/대댓글 구분
  onLike: (id: number, increment: number, isReply: boolean) => void;
};

export default function ThumbsUpCount({ item, onLike }: ThumbsUpCountProps) {
  const [isThumbsUpStatus, setIsThumbsUpStatus] = useState(false);
  const [isThumbsUpCount, setIsThumbsUpCount] = useState(item.likeCount);

  useEffect(() => {
    setIsThumbsUpCount(item.likeCount);
  }, [item.likeCount]);

  // 좋아요 버튼 클릭 핸들러
  const handleThumbsUp = (
    e: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
  ) => {
    e.stopPropagation();
    const increment = isThumbsUpStatus ? -1 : 1;
    setIsThumbsUpCount(isThumbsUpCount + increment);
    setIsThumbsUpStatus(!isThumbsUpStatus);

    // 대댓글인 경우
    if (item.replyId !== undefined) {
      onLike(item.replyId, increment, true);
      // 댓글인 경우
    } else if (item.commentId !== undefined) {
      onLike(item.commentId, increment, false);
    }
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
