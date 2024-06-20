'use client'

import Link from 'next/link';
import HeartButton from '../animations/HeartButton';
import PlusButton from '../animations/PlusButton';
import Image from 'next/image';
import { PostBoxNewProps } from '../../constants/interface';
import { boxWidths } from '../../constants';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { selectNumberOfBoxes } from '../../store/slice/boxLayoutSlice';

export default function PostBox({ item }: PostBoxNewProps) {

  const numberOfBoxes = useSelector((state: RootState) => selectNumberOfBoxes(state));

  let layoutNum = numberOfBoxes

  const handleHeartClick = () => {
    console.log('Click...Heart!')
  }

  const handlePlusClick = () => {
    console.log('Click...Plus!')
  }

  return (
    <div className="box relative mb-[16px] flex items-center justify-center rounded-2xl overflow-hidden transition-all duration-500  border-[5px] border-transparent hover:border-purple p-[5px]" style={{ width: boxWidths[layoutNum]}}>
      <Link href={`post/${item.data.postId}`} className="absolute inset-0 z-0">
        <Image
          src={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'}
          alt="postImage"
          fill
          style={{objectFit: 'cover', width: '100%', height: '100%'}}
          quality={100}
          priority
          sizes='100vw, 50vw, 33vw' 
        />
      </Link>
      <button
        onClick={handleHeartClick}
        className="absolute top-2 right-2 z-10">
        <HeartButton width="21px" height="19px" isClicked={ item.data.like } />
      </button>
      <button 
        onClick={handlePlusClick}
        className="absolute bottom-2 right-2 z-10">
        <PlusButton />
      </button>
    </div>
  );
}
