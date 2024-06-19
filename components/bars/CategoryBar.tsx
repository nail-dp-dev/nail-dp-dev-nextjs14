import Link from 'next/link';
import { archiveCategoryElements } from '../../constants';

export default function CategoryBar() {
  return (
    <div className='categoryBar w-full h-[66px] flex flex-col items-center justify-center'>
      <div className='innerBar w-full h-[53px] flex gap-[32px]'>
        <Link href={'/'} className='inline-flex h-[100%] items-center justify-center border-purple border-b-[3px]'>
          <p className='text-[14px] font-[700]'>For You</p>
        </Link>
        <Link href={'/'} className='inline-flex h-[100%] items-center justify-center border-purple border-b-[3px]'>
          <p className='text-[14px] font-[700]'>For You</p>
        </Link>
        <Link href={'/'} className='inline-flex h-[100%] items-center justify-center border-purple border-b-[3px]'>
          <p className='text-[14px] font-[700]'>For You</p>
        </Link>
      </div>
    </div>
  )
}