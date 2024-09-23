import React, { useState, useEffect, useRef, useCallback } from 'react';
import PostHeartIcon from '../icons/PostHeartIcon';
import PostChatIcon from '../icons/PostChatIcon';
import PostShareIcon from '../icons/PostShareIcon';
import { PostsDetailData } from '../../../../../../../types/dataType';
import PostHeartFillIcon from '../icons/PostHeartFillIcon';
import PostShareButton from '../../../../../../../components/buttons/PostShareButton';
import { getPostLikeCount } from '../../../../../../../api/post/getPostLikeCount';
import { deletePostUnlike } from '../../../../../../../api/post/deletePostUnlike';
import { postPostLike } from '../../../../../../../api/post/postPostLike';
import { useHandleShareCount } from '../../../../../../../hooks/useHandleShareCount';

interface PostCountProps {
  post: PostsDetailData['data'];
  postId: number;
  toggleScroll: () => void;
  nickname: string;
  imageUrl: string;
  sharedCount: number;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
  imageBoxWidth: number;
}

// 게시글 좋아요 숫자
export default function PostCount({
  post,
  toggleScroll,
  postId,
  nickname,
  imageUrl,
  sharedCount,
  setSharedCount,
  imageBoxWidth,
}: PostCountProps) {
  const [isHeartStatus, setIsHeartStatus] = useState(post.liked);
  const [heartCount, setHeartCount] = useState(post.likeCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleShareCount = useHandleShareCount('post', postId, setSharedCount);

  useEffect(() => {
    const fetchLikeCount = async () => {
      try {
        const data = await getPostLikeCount(postId);
        setHeartCount(data.likeCount ?? post.likeCount);
      } catch (error) {
        console.error('Failed to fetch like count', error);
        setHeartCount(post.likeCount);
      }
    };

    fetchLikeCount();
  }, [postId, post.likeCount]);

  const handleHeartClick = async () => {
    try {
      if (isHeartStatus) {
        await deletePostUnlike(postId);
        setHeartCount(heartCount - 1);
      } else {
        await postPostLike(postId);
        setHeartCount(heartCount + 1);
      }

      setIsHeartStatus(!isHeartStatus);
    } catch (error) {
      console.error('Failed to toggle like status', error);
      alert('좋아요 처리 중 오류가 발생했습니다.');
    }
  };

  const handleShareClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, handleClickOutside]);

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[44px] pr-[54px] text-[0.8125rem] font-bold text-darkPurple">
        <div className="ml-1 flex items-center">
          <button onClick={handleHeartClick}>
            {isHeartStatus ? (
              <PostHeartFillIcon className="mr-2 fill-red" />
            ) : (
              <PostHeartIcon className="mr-2 fill-darkPurple hover:fill-red" />
            )}
          </button>
          {heartCount}
        </div>
        <div
          className={`flex items-center  ${imageBoxWidth < 500 ? 'text-purple' : 'text-darkPurple'}`}
        >
          <PostChatIcon
            className={`mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple  
            ${imageBoxWidth < 500 ? 'fill-purple' : 'fill-darkPurple'} `}
            onClick={toggleScroll}
          />
          {post.commentCount}
        </div>
        <div className=" flex items-center" ref={menuRef}>
          <PostShareIcon
            className={`mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple 
            ${isMenuOpen ? 'fill-purple' : ''} `}
            onClick={handleShareClick}
          />
          {sharedCount}
          {isMenuOpen && (
            <PostShareButton
              onClick={handleShareCount}
              nickname={nickname}
              imageUrl={imageUrl}
            />
          )}
        </div>
      </div>
    </div>
  );
}
