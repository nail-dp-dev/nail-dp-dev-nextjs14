'use client';

import PostBox from '../../../components/boxes/PostBox';
import { newPosts, userMyPageData } from '../../../constants/example';
import PostCreate from '../../../components/animations/PostCreateIcon';
import CategoryBar from '../../../components/bars/CategoryBar';
import { myPageCategoryElements } from '../../../constants';
import { useEffect, useState } from 'react';
import UserImage from '../../../components/ui/UserImage';
import UserInfo from '../../../components/ui/UserInfo';
import useLoggedInUserData from '../../../hooks/auth/useLoggedInUserData';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slice/loginSlice';

export default function MyPagePage() {
  const [isScroll, setIsScroll] = useState(false);
  const isLoggedIn = useSelector(selectLoginStatus);
  const { userData } = useLoggedInUserData();
  console.log(userData);

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
      className={`relative h-full overflow-y-scroll scrollbar-hide ${isScroll ? 'mt-[66px]' : ''}
      `}
    >
      {isLoggedIn === 'loggedIn' && userData && (
        <div className="flex min-h-[160px] items-center">
          <UserImage
            src={userData.data.profileUrl}
            alt="프로필이미지"
            width={128}
            height={128}
          />
          <div className="ml-[16px] flex-1">
            <UserInfo
              nickname={userData.data.nickname}
              postsCount={userData.data.postsCount}
              saveCount={userData.data.saveCount}
              followerCount={userData.data.followerCount}
              followCount={userData.data.saveCount}
              hoverStyle=""
              nicknameStyle="text-[22px] font-bold"
              statsStyle="text-sm font-normal"
            />
          </div>
        </div>
      )}
      <div
        className={`${isScroll ? 'fixed top-[84px] z-30 w-[calc(100%_-_365px)] bg-white' : ''}`}
      >
        <CategoryBar elements={myPageCategoryElements} />
      </div>
      <div className="MyPageContainer max-h-full ">
        <div
          className={`outBox flex h-full flex-wrap items-center gap-[0.7%] rounded-[20px] transition-all`}
        >
          <PostCreate />
          {newPosts &&
            newPosts.map((item, index) => {
              if (index === 0) {
                return (
                  // <div key={index}>
                    <PostBox
                      key={index}
                      postId={item.data.postId}
                      photoId={item.data.photoId}
                      photoUrl={item.data.photo_url}
                      like={item.data.like}
                      saved={item.data.saved}
                      createdDate={index}
                    />
                  // </div>
                );
              } else {
                return (
                  <PostBox
                    key={index}
                    postId={item.data.postId}
                    photoId={item.data.photoId}
                    photoUrl={item.data.photo_url}
                    like={item.data.like}
                    saved={item.data.saved}
                    createdDate={index}
                  />
                );
              }
            })}
        </div>
      </div>
    </div>
  );
}
