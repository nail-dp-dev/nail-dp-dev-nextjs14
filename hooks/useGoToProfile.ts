import { useRouter } from 'next/navigation';
import useLoggedInUserData from './user/useLoggedInUserData';

// 프로필 클릭 시 마이페이지 or 프로필페이지로 이동
export const useGoToProfile = () => {
  const router = useRouter();
  const { userData } = useLoggedInUserData();

  const goToProfile = (nickname: string) => {
    if (!nickname) {
      console.error('닉네임이 없습니다.');
      return;
    }

    if (userData && userData.data.nickname === nickname) {
      router.push('/my-page');
    } else {
      router.push(`/profile/${nickname}`);
    }
  };

  return { goToProfile };
};
