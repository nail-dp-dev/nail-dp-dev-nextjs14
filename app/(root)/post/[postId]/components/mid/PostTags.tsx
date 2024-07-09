import React from 'react';
import { PostsDetailData } from '../../../../../../types/dataType';

interface PostTagsProps {
  post: PostsDetailData['data'];
}

export default function PostTags({ post }: PostTagsProps) {
  return (
    <div className="flex flex-wrap gap-[5px]  sm:max-w-[200px] md:max-w-[300px] lg:max-w-[400px] xl:max-w-[600px] 2xl:max-w-[800px]">
      {post.tags.map((tag, index) => (
        <button
          className="hashtag-layout hashtag-hover-active button-tr  
          button-tr-tf bg-hashTagGray hover:text-white active:text-white"
          key={index}
        >
          {tag.tagName}
        </button>
      ))}
    </div>
  );
}
