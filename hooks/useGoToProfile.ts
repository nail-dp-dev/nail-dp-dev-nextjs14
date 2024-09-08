import { useRouter } from 'next/navigation';

export const useGoToProfile = () => {
  const router = useRouter();

  const goToProfile = (nickname: string) => {
    if (nickname !== undefined) {
      localStorage.setItem("name", nickname);
      router.push(`/profile/${nickname}`);
    } else {
      console.error('닉네임이 없습니다.');
    }
  };

  return { goToProfile };
};
