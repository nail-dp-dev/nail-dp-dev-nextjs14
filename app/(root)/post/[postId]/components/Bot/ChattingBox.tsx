import Toggle from '../../../../../../components/buttons/Toggle';
import UserImage from '../../../../../../components/ui/UserImage';
import UserInfo from '../../../../../../components/ui/UserInfo';
import { CommentData } from '../../../../../../types/dataType';
import ThumbsUpIcon from '../icons/ThumbsUpIcon';

interface userProps {
  user: CommentData['data'];
}

export default function ChattingBox({ user }: userProps) {
  if (!user) {
    return <div>댓글을 찾을 수 없습니다.</div>;
  }
  return (
    <>
      <div className="flex items-center py-2 pl-4 ">
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
        className="max-h-[207px] w-full overflow-auto rounded-2.5xl
        bg-purple bg-opacity-20"
      >
        {user.map((item, index) => (
          <div
            className="comment-box button-tr test-hover:block group mx-4 mb-4 mt-[10px] flex
            justify-between rounded-2.5xl border-2 hover:bg-darkPurple hover:bg-opacity-20 "
            key={index}
          >
            <div className="flex">
              <div className="mr-3 border-2">
                <UserImage
                  src={item.profileUrl}
                  alt="임시이미지"
                  width={40}
                  height={40}
                />
              </div>

              <div className="border-2  leading-4">
                <div className="flex ">
                  <UserInfo
                    nickname={item.commentUserNickname}
                    nicknameStyle="text-sm font-bold "
                  />
                  <p className="commentDate text-14px-normal-dP ml-3">
                    {item.commentDate}
                  </p>
                </div>
                <p className="comment text-sm  font-normal">
                  {item.commentContent}
                </p>
                <div className="mt-[8.5px] flex items-center gap-2 border-2">
                  <ThumbsUpIcon className="peer fill-darkPurple hover:fill-red" />
                  <p className="text-14px-normal-dP peer-hover:text-red">
                    {item.likeCount}
                  </p>
                </div>
              </div>
            </div>

            <div className="mr-3 mt-3 hidden h-full group-hover:block ">
              <Toggle />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
