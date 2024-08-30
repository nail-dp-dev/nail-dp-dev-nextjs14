import React, { useCallback } from 'react';
import { postPostShare } from '../api/post/postPostShare';

// 공유 클릭 시 횟수 증가
export const useHandleShareCount = (
  type: 'post' | 'archive',
  postId: number | undefined,
  setSharedCount?: React.Dispatch<React.SetStateAction<number>>,
) => {
  const handleShareCount = useCallback(async () => {
    if (type === 'post' && postId && setSharedCount) {
      try {
        const updatedSharedCount = await postPostShare(postId);

        if (updatedSharedCount !== null) {
          setSharedCount(updatedSharedCount);
        } else {
          setSharedCount((prevCount) => prevCount + 1);
        }
      } catch (error) {
        console.error('Error updating shared count:', error);
      }
    } else {
      console.log('Archive share does not require API call.');
    }
  }, [type, postId, setSharedCount]);

  return handleShareCount;
};
