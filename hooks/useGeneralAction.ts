import { useState, useEffect, useRef, useCallback } from 'react';

export function useGeneralAction() {
  const [showGeneralAction, setShowGeneralAction] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  
  // 토글 클릭 시 옵션메뉴 나타남
  const handleToggleClick = useCallback(() => {
    setShowGeneralAction((prev) => !prev);
  }, []);

  //옵션메뉴 영역 밖 클릭 시 옵션메뉴 닫힘
  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
      setShowGeneralAction(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  return {
    showGeneralAction,
    handleToggleClick,
    boxRef,
  };
}
