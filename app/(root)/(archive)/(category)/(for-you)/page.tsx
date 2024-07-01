import React, { Suspense } from 'react';
import PostBox from '../../../../../components/boxes/PostBox';
import Loading from '../../../../loading';
import { getPostsData } from '../../../../../api/post/getPostsData';

export default async function ForYouPage() {
  
  const postsData = await getPostsData()

  return (
    <div className='ForYouContainer max-h-full overflow-hidden'>
      <Suspense fallback={<Loading/>}>
        <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y'>
          {
            postsData.data.map((item, index) => (
              <PostBox key={index} postId={item.postId} photoId={item.photoId} photo_url={item.photo_url} like={item.like} saved={item.saved} />
            ))
          }
        </div>
      </Suspense>
    </div>
  );
}