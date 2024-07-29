import { useState, useEffect, useRef, useCallback } from 'react';

export function useGeneralAction() {
  const [showGeneralAction, setShowGeneralAction] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const handleToggleClick = useCallback(() => {
    setShowGeneralAction((prev) => !prev);
  }, []);

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
