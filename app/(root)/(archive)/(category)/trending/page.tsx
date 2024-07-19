import React, { Suspense } from 'react';
import Loading from '../../../../loading';
import PostsBox from '../../../../../components/boxes/PostsBox';

export default async function TrendingPage() {

  return (
    <div className='ForYouContainer max-h-full overflow-hidden'>
      <Suspense fallback={<Loading/>}>
        <PostsBox />
      </Suspense>
    </div>
  );
}