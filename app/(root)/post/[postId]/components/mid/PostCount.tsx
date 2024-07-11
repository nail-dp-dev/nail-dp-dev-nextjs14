import React, { useState, useEffect } from 'react';
import PostHeartIcon from '../icons/PostHeartIcon';
import PostChatIcon from '../icons/PostChatIcon';
import PostShareIcon from '../icons/PostShareIcon';
import { PostsDetailData } from '../../../../../../types/dataType';
import PostHeartFillIcon from '../icons/PostHeartFillIcon';
import { getPostsData } from '../../../../../../api/post/getPostsData';

interface PostCountProps {
  post: PostsDetailData['data'];
  toggleScroll: () => void;
  user: PostsDetailData['data'];
}

export default function PostCount({ post, toggleScroll }: PostCountProps) {
  const [isHeartStatus, setIsHeartStatus] = useState(false);
  const [heartCount, setHeartCount] = useState(post.likeCount);

  // 게시물 데이터를 가져옴
  // !!해당 게시물에서 하트status 변경 시 홈 화면에도 적용시켜야함 => redux로 관리?
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsData = await getPostsData();
        const postData = postsData.data.find((p) => p.postId === post.postId);
        if (postData) {
          setIsHeartStatus(postData.like);
        }
      } catch (error) {
        console.error('Error fetching post data:', error);
      }
    };

    fetchData();
  }, [post.postId]);

  const handleFollowToggle = () => {
    if (isHeartStatus) {
      setHeartCount(heartCount - 1);
    } else {
      setHeartCount(heartCount + 1);
    }
    setIsHeartStatus(!isHeartStatus);
  };

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
        <div className="flex items-center">
          <PostShareIcon className="mr-2 fill-darkPurple hover:fill-purple active:fill-darkPurple" />
          {post.sharedCount}
        </div>
      </div>
    </div>
  );
}
