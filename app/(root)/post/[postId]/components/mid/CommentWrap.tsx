import React from 'react';
import { CommentData } from '../../../../../../types/dataType';
import CommentItem from './CommentItem';

interface userProps {
  user: CommentData['data'];
}

export default function CommentWrap({ user }: userProps) {
  if (!user) {
    return <div>댓글을 찾을 수 없습니다.</div>;
  }

  const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <>
      <div className="flex items-center py-2 pl-4">
        <div>
          <p className="mr-5 text-lg font-bold">댓글</p>
        </div>
        <div className="flex gap-1 text-sm font-medium text-darkPurple">
          <p>최신순</p>
          <p className="text-navMenuBotSolidGray">|</p>
          <p className="font-light">인기순</p>
        </div>
      </div>

      <div
        className={`w-full overflow-y-hidden rounded-2.5xl bg-purple bg-opacity-20
          transition-all duration-300`}
      >
        {user.map((item, index) => (
          <div key={item.commentId}>
            <CommentItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
}
