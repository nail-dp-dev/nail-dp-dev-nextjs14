import React, { useState, useEffect, useRef } from 'react';
import PostHeartIcon from '../icons/PostHeartIcon';
import PostChatIcon from '../icons/PostChatIcon';
import PostShareIcon from '../icons/PostShareIcon';
import { PostsDetailData } from '../../../../../../types/dataType';
import PostHeartFillIcon from '../icons/PostHeartFillIcon';
import { getPostsData } from '../../../../../../api/post/getPostsData';
import PostShareButton from '../../../../../../components/buttons/PostShareButton';

interface PostCountProps {
  post: PostsDetailData['data'];
  toggleScroll: () => void;
}

export default function PostCount({ post, toggleScroll }: PostCountProps) {
  const [isHeartStatus, setIsHeartStatus] = useState(false);
  const [heartCount, setHeartCount] = useState(post.likeCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [sharedCount, setSharedCount] = useState(post.sharedCount);
  const menuRef = useRef<HTMLDivElement>(null);

  
  const handleFollowToggle = () => {
    if (isHeartStatus) {
      setHeartCount(heartCount - 1);
    } else {
      setHeartCount(heartCount + 1);
    }
    setIsHeartStatus(!isHeartStatus);
  };

  const handleShareClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleMenuClick = (message: string) => {
    alert(message);
    setSharedCount(sharedCount + 1);
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div className="flex justify-between py-4">
      <div className="flex gap-[44px] pr-[54px] text-[0.8125rem] font-bold text-darkPurple">
        <div className="flex items-center">
          <button onClick={handleFollowToggle}>
            {isHeartStatus ? (
              <PostHeartFillIcon className="mr-2 fill-red" />
            ) : (
              <PostHeartIcon className="mr-2 fill-darkPurple hover:fill-red" />
            )}
          </button>
          {heartCount}
        </div>
        <div className="flex items-center">
          <PostChatIcon
            className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple"
            onClick={toggleScroll}
          />
          {post.commentCount}
        </div>
        <div className="relative flex items-center" ref={menuRef}>
          <PostShareIcon
            className={`mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple ${isMenuOpen ? 'fill-purple' : ''}`}
            onClick={handleShareClick}
          />
          {sharedCount}
          {isMenuOpen && <PostShareButton onClick={handleMenuClick} />}
        </div>
      </div>
    </div>
  );
}
