import { newPosts } from '../../../../constants/example';
import PostBox from '../../../../components/boxes/PostBox';

export default function ForYouPage() {
  
  return (
    <div className='ForYouContainer max-h-full overflow-hidden'>
      <div className='outBox flex h-full flex-wrap items-center gap-[0.7%] overflow-auto overflow-y-scroll rounded-[20px] transition-all'>
        {
          newPosts.map((item, index) => (
            <PostBox key={index} item={item} />
          ))
        }
      </div>
    </div>
  );
}