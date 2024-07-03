import UserImage from '../../../../../components/ui/UserImage';
import UserInfo from '../../../../../components/ui/UserInfo';
import { userMyPageData } from '../../../../../constants/example';

export default function TopContainer() {
  return (
    <div className="flex max-h-[92px] flex-wrap items-center justify-between  p-4">
      <div className="wrap-left flex flex-wrap items-center gap-4">
        <UserImage
          src="/assets/img/logoutProfileImage.png"
          alt="프로필이미지"
          width={56}
          height={56}
        />
        <div className="wrap-info  pb-2 leading-3">
          <UserInfo
            nickname={userMyPageData.data.nickname}
            nicknameStyle="text-base font-medium"
            statsStyle="text-14px-normal-dP"
          />
          <span className="text-14px-normal-dP ">
            {userMyPageData.data.followerCount} 팔로워
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          <button className="button-layout button-color px-[22.5px] py-[5.5px]">
            팔로우
          </button>
          <button className="button-layout border-2 border-purple bg-white px-[22.5px] py-[3.5px] text-purple">
            팔로잉
          </button>
        </div>
      </div>
      <div className="wrap-right  flex flex-wrap ">
        <button className="button-layout button-color px-[22.5px] py-[5.5px]">
          게시글 설정
        </button>
        <button className="button-layout button-color ml-4 px-[22.5px] py-[5.5px]">
          게시글 수정
        </button>
      </div>
    </div>
  );
}
