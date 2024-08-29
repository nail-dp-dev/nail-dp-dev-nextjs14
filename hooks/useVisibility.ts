import { useState } from 'react';

// 삭제된 항목을 화면에서 제거
export function useVisibility() {
  const [isVisible, setIsVisible] = useState(true);
  const handleDelete = () => {
    setIsVisible(false); 
  };

  return { isVisible, handleDelete };
}
