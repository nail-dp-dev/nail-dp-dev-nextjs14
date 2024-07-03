'use client';

import PostBox from '../../../components/boxes/PostBox';
import { newPosts, userMyPageData } from '../../../constants/example';
import PostCreat from '../../../components/animations/PostCreateIcon';
import CategoryBar from '../../../components/bars/CategoryBar';
import { myPageCategoryElements } from '../../../constants';
import { Key, useEffect, useState } from 'react';
import UserImage from '../../../components/ui/UserImage';
import UserInfo from '../../../components/ui/UserInfo';


export default function MyPagePage() {
  const [isScroll, setIsScroll] = useState(false);

 
  useEffect(() => {
    function handleScroll() {
      const element1 = document.getElementById('scroll1');
      if (element1) {
        const scrollTop = element1.scrollTop;

        if (scrollTop >= 160) {
          setIsScroll(true);
        } else {
          setIsScroll(false);
        }
      }
    }

    const scrollElement = document.getElementById('scroll1');
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll);
      return () => scrollElement.removeEventListener('scroll', handleScroll);
    }
  }, []);

  return (
    <div
      id="scroll1"
      className={`relative h-full overflow-y-scroll scrollbar-hide ${isScroll ? 'snap-mandatory snap-y mt-[66px]' : ''}`}
    >
      <div className="flex items-center min-h-[160px]">
        <UserImage
          src="/assets/img/logoutProfileImage.png"
          alt="프로필이미지"
          width={128}
          height={128}
        />
        <div className="flex-1 ml-[16px]">
          <UserInfo
            nickname={userMyPageData.data.nickname}
            postsCount={userMyPageData.data.postsCount}
            saveCount={userMyPageData.data.saveCount}
            followerCount={userMyPageData.data.followerCount}
            followCount={userMyPageData.data.followCount}
            hoverStyle=""
            nicknameStyle="text-[22px] font-bold"
            statsStyle="text-sm font-normal"
          />
        </div>
      </div>
      <div
        className={`${isScroll ? 'fixed w-[calc(100%_-_365px)] top-[84px] z-30 bg-white' : ''}`}
      >
        <CategoryBar elements={myPageCategoryElements} />
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        >
          <PostCreat />
          {newPosts &&
            newPosts.map((item, index) => <PostBox key={index} postId={item.data.postId} photoId={item.data.photoId} photo_url={item.data.photo_url} like={item.data.like} saved={item.data.saved} />)}        </div>
      </div>
    </div>
  );
}
