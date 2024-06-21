'use client'

import { useEffect, useState } from 'react';
import { newPosts as originalNewPosts } from '../../../../constants/example';
import PostBox from '../../../../components/boxes/PostBox';
import Loading from '../../../loading';

export interface PostData {
  success: boolean;
  code: number;
  data: {
    postId: number;
    photoId: number;
    photo_url: string;
    like: boolean;
    saved: boolean;
  };
}

export default function ForYouPage() {
  const [newPosts, setNewPosts] = useState<PostData[] | null>(null);

  useEffect(() => {
    setTimeout(() => {
      setNewPosts(originalNewPosts);
    }, 2000); 
  }, []);
  
  return (
    <div className='ForYouContainer max-h-full overflow-hidden'>
      <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all'>
        {
          newPosts ? 
          newPosts.map((item, index) => (
            <PostBox key={index} item={item} />
          ))
            :
          <Loading />
        }
      </div>
    </div>
  );
}
