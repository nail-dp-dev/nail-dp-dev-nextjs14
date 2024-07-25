'use client';

import React, { useState, useEffect, useRef } from 'react';
import CommentWrap from './mid/CommentWrap';
import PostCount from './mid/PostCount';
import PostTags from './mid/PostTags';
import ImageSlider from './ImageSlider';
import { CommentData, PostsDetailData } from '../../../../../types/dataType';
import { AddCommentType } from '../../../../../hooks/useComments';
import BoxCommonButton from '../../../../../components/ui/BoxCommonButton';
import GeneralAction from '../../../../../components/buttons/option-menu/GeneralAction';
import { useGeneralAction } from '../../../../../hooks/useGeneralAction';

interface MidContainerProps {
  post: PostsDetailData['data'];
  comments: CommentData['data'];
  onAddComment: (newComment: AddCommentType) => void;
  onAddReply: (parentId: number, newComment: AddCommentType) => void;
  onLike: (commentId: number, increment: number) => void;
  onReply: (id: number, name: string) => void;
  onSaveEdit: (
    commentId: number,
    parentId: number | null,
    newContent: string,
  ) => void;
  onDelete: (commentId: number, parentId: number | null) => void;
}

export default function MidContainer({
  post,
  comments,
  onAddComment,
  onAddReply,
  onLike,
  onReply,
  onSaveEdit,
  onDelete,
}: MidContainerProps) {
  const MAX_WIDTH = 550;
  const MIN_WIDTH = 300;
  const INITIAL_WIDTH = MAX_WIDTH;
  const [imageBoxWidth, setImageBoxWidth] = useState(INITIAL_WIDTH);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isScrolledDown, setIsScrolledDown] = useState(false);
  const startY = useRef(0);
  const { showGeneralAction, handleToggleClick, boxRef } = useGeneralAction();

  const adjustBoxSize = (deltaY: number) => {
    const newWidth = Math.max(
      MIN_WIDTH,
      Math.min(MAX_WIDTH, imageBoxWidth - deltaY * 0.7),
    );
    setImageBoxWidth(newWidth);
  };

  const toggleScroll = () => {
    if (containerRef.current) {
      const scrollAmount = 240;
      const scrollDownTarget = containerRef.current.scrollTop + scrollAmount;
      const scrollUpTarget = 0;
      const scrollTarget = isScrolledDown ? scrollUpTarget : scrollDownTarget;

      adjustBoxSize(scrollAmount);

      if (isScrolledDown && imageBoxWidth < INITIAL_WIDTH) {
        setIsScrolledDown(false);
        setImageBoxWidth(INITIAL_WIDTH);
      }

      containerRef.current.scrollTo({
        top: scrollTarget,
        behavior: 'smooth',
      });

      setIsScrolledDown(!isScrolledDown);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setIsScrolledDown(containerRef.current.scrollTop > 0);
      }
    };

    const handleWheel = (event: WheelEvent) => {
      adjustBoxSize(event.deltaY);
    };

    const handleTouchStart = (event: TouchEvent) => {
      startY.current = event.touches[0].clientY;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const deltaY = startY.current - event.touches[0].clientY;
      const newWidth = Math.max(
        MIN_WIDTH,
        Math.min(MAX_WIDTH, imageBoxWidth - deltaY * 0.7),
      );
      setImageBoxWidth(newWidth);
      startY.current = event.touches[0].clientY;
    };

    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [imageBoxWidth]);

  return (
    <div ref={containerRef} className="h-screen overflow-y-scroll">
      <div className="mx-auto my-0 flex w-full flex-col justify-center">
        <div className="BoxWrap sticky mb-[50px] mt-5 flex justify-center">
          <div
            className={`ImageBox relative aspect-square rounded-2xl bg-textLightYellow transition-all 
            duration-300 ${imageBoxWidth >= 500 ? 'min-w-[550px]' : 'min-w-[300px]'}`}
          >
            <ImageSlider files={post.files} />
            <BoxCommonButton
              onClick={handleToggleClick}
              type="toggle"
              width="4px"
              height="20px"
              position="top-left"
              className="p-2"
              showGeneralAction={showGeneralAction}
            />
            {showGeneralAction && (
              <div ref={boxRef} className=" absolute left-5 top-0 z-20">
                <GeneralAction type="post" />
              </div>
            )}
            <BoxCommonButton
              onClick={() => console.log('Plus Clicked')}
              type="plus"
              width="36px"
              height="36px"
              position="bottom-right"
              className="p-2"
            />
          </div>
          <div
            className={`ContentBox ml-[15px] rounded-2xl bg-lightGray px-3 
            pt-[10px] text-sm font-light text-black transition-all duration-300 
            ${imageBoxWidth >= 500 ? 'w-[300px]' : 'min-w-[500px]'}
            ${post.postContent ? 'block' : 'hidden'}`}
          >
            {post.postContent}
          </div>
        </div>
        <div>
          <div className="postInfo flex flex-wrap items-center justify-between">
            <PostCount post={post} toggleScroll={toggleScroll} />
            <PostTags post={post} />
          </div>
          <div>
            <CommentWrap
              user={comments}
              onLike={onLike}
              onReply={onReply}
              onSaveEdit={onSaveEdit}
              onDelete={onDelete}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
