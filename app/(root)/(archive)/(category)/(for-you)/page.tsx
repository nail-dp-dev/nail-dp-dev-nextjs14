import React, { Suspense } from 'react';
import PostBox from '../../../../../components/boxes/PostBox';
import { newPosts } from '../../../../../constants/example';
import Loading from '../../../../loading';

export default function ForYouPage() {

  return (
    <Suspense fallback={<Loading/>}>
      <div className='ForYouContainer max-h-full overflow-hidden'>
        <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y'>
            {
              newPosts.map((item, index) => (
                <PostBox key={index} item={item} />
              ))
            }
        </div>
      </div>
    </Suspense>
  );
}