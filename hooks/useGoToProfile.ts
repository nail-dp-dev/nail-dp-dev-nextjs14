import { useRouter } from 'next/navigation';
import useLoggedInUserData from './user/useLoggedInUserData';

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
