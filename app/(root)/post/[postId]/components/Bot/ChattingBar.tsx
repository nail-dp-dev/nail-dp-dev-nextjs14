import UserImage from '../../../../../../components/ui/UserImage';
import { userProfileImageData } from '../../../../../../constants/example';
import EmoticonIcon from '../../../../../../public/assets/svg/emoticon.svg';

export default function ChattingBar() {
  return (
    <div className="z-9 sticky bottom-0 flex items-center gap-3 border-2 bg-white p-4">
      <div className="">
        <UserImage
          src={`${userProfileImageData.photos[2]['photo_url']}`}
          alt={'profileImage'}
          width={40}
          height={40}
        />
      </div>
      <form className="relative h-12 w-full border-2">
        <textarea
          placeholder="Add a comment"
          className="h-full w-full resize-none overflow-hidden rounded-2.5xl bg-lightGray py-3 
          pl-4 text-base  font-normal text-darkPurple  outline-none placeholder:text-darkPurple"
        />
        <div
          className="absolute right-0 top-1/2
        flex -translate-y-1/2 transform items-center "
        >
          <EmoticonIcon />
          <button className="button-layout button-color ml-[22px] mr-2 px-[26px] py-[5.5px] text-sm font-medium ">
            Post
          </button>
        </div>
      </form>
    </div>
  );
}
