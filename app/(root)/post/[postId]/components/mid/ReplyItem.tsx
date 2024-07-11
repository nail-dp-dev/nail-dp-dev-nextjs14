import Toggle from '../../../../../../components/buttons/Toggle';
import UserImage from '../../../../../../components/ui/UserImage';
import UserInfo from '../../../../../../components/ui/UserInfo';
import { ReplyData } from '../../../../../../types/dataType';
import ReplyIcon from '../icons/ReplyIcon';
import ThumbsUpCount from './ThumbsUpCount';

type ReplyItemProps = {
  item: ReplyData['data'][number];
};

export default function ReplyItem({ item }: ReplyItemProps) {
  return (
    <div className="reply-box button-tr ml-14 flex justify-between rounded-xl group/toggle2
    pb-[10px] pl-[10px] pt-[10px] hover:bg-darkPurple hover:bg-opacity-20">
      <div className="flex ">
        <div className="mr-3 ">
          <UserImage
            src={item.profileUrl}
            alt="임시이미지"
            width={40}
            height={40}
          />
        </div>

        <div className="leading-4">
          <div className="flex">
            <UserInfo
              nickname={item.commentUserNickname}
              nicknameStyle="text-sm font-bold"
            />
            <p className="commentDate text-14px-normal-dP ml-3">
              {item.commentDate}
            </p>
          </div>
          <p className="comment text-sm font-normal">
            {item.commentContent}
          </p>
          <div className="mt-[8.5px] flex items-center ">
            <ThumbsUpCount item={item} />
            <ReplyIcon className="ml-[10px] mr-[2px] fill-darkPurple hover:fill-purple " />
          </div>
        </div>
      </div>
      <div className={`mr-3 hidden  h-full group-hover/toggle2:block`}>
        <Toggle />
      </div>
    </div>
  );
}
