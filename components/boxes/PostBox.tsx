'use client'

import Link from 'next/link';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Image from 'next/image';
import Video from '../ui/Video';
import { PostBoxNewProps } from '../../constants/interface';
import { postBoxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';
import { postPostLike } from '../../api/post/postPostLike';
import { deletePostLike } from '../../api/post/deletePostLike';

export default function PostBox({ postId, photoId, photoUrl, like, saved, createdDate }: PostBoxNewProps) {
    
  const layoutNum = useSelector(selectNumberOfBoxes);

  const handleHeartClick = (postId: number) => {
    deletePostLike(postId)
    postPostLike(postId)
  }

  const handlePlusClick = (postId: number) => {
    console.log(`plus button click... ${postId}`)
  }

  const isPhoto = photoUrl.endsWith('.jpg') || photoUrl.endsWith('.jpeg') || photoUrl.endsWith('.png') || photoUrl.endsWith('.gif');
  const isVideo = photoUrl.endsWith('.mp4');

  return (
    <div className="box relative mb-[16px] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500  border-[5px] border-transparent hover:border-purple p-[5px] snap-end" style={{ width: postBoxWidths[layoutNum]}}>
      <Link href={`post/${postId}`} className="absolute inset-0 z-0">
      {
        isPhoto &&          
        <Image
          src={photoUrl}
          alt={createdDate}
          id={photoId.toString()}
          fill
          style={{objectFit: 'cover', width: '100%', height: '100%'}}
          quality={100}
          priority
          sizes='100vw, 50vw, 33vw'
          blurDataURL="https://image-component.nextjs.gallery/placeholder"
          placeholder='blur'
        />
      }
      {
        isVideo && 
        <Video
          src={photoUrl}
          width={'100%'}
          height={'100%'}
        />
      }
      </Link>
      <button
        onClick={()=>handleHeartClick(postId)}
        className="absolute top-2 right-2 z-10">
        <HeartButton width="21px" height="19px" isClicked={ like } />
      </button>
      <button 
        onClick={()=>handlePlusClick(postId)}
        className="absolute bottom-2 right-2 z-10">
        <PlusButton width="24px" height="24px" isClicked={ saved }/>
      </button>
    </div>
  );
}
