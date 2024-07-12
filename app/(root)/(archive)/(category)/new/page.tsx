import React, { Suspense } from 'react';
import PostBox from '../../../../../components/boxes/PostBox';
import Loading from '../../../../loading';
import { getAllPostsData } from '../../../../../api/post/getAllPostsData';

export default async function NewPage() {

  const postsData = await getAllPostsData('NEW')

  return (
    <Suspense fallback={<Loading/>}>
      <div className='newContainer max-h-full overflow-hidden'>
        <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y'>
            {
              postsData &&
              postsData.data.map((item:any, index:number) => (
                <PostBox key={index} postId={item.postId} photoId={item.photoId} photo_url={item.photo_url} like={item.like} saved={item.saved} />
              ))
            }
        </div>
      </div>
    </Suspense>
  );
}