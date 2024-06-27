'use client';

import PostBox from '../../../components/boxes/PostBox';
import { newPosts } from '../../../constants/example';
import PostCreat from '../../../components/animations/PostCreateIcon';
import Profile from '../../../components/boxes/ProfileBox';
import CategoryBar from '../../../components/bars/CategoryBar';
import { myPageCategoryElements } from '../../../constants';
import { useState } from 'react';

export default function MyPagePage() {
  const [isScrollState, setIsScrollState] = useState(false);

  const handleScroll = (e: any) => {
    const scrollTop = e.target.scrollTop;
    if (scrollTop >= 160) {
      setIsScrollState(true);
    } else {
      setIsScrollState(false);
    }
  };
  
  return (
    <div
      className={`max-h-full ${isScrollState ? '' : 'overflow-auto overflow-y-scrol'} `}
      onScroll={handleScroll}
    >
      <Profile />
      <div className="sticky">
        <CategoryBar elements={myPageCategoryElements} />
      </div>
      <section className="MyPageContainer h-full overflow-hidden">
        <div className={`outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all snap-mandatory snap-y`}>
          <PostCreat />
          {newPosts &&
            newPosts.map((item, index) => <PostBox key={index} item={item} />)}
        </div>
      </section>
    </div>
  );
}
