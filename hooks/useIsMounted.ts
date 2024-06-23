import { useEffect, useState } from 'react';

// 컴포넌트가 마운트되었는지를 추적
// 초기 렌더링 시 화면 깜박거림을 방지 및 클라이언트와 서버 사이의 상태 불일치 해결
const useIsMounted = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  return isMounted;
};

export default useIsMounted;
