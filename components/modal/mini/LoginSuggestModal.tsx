'use client'

import Link from 'next/link';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slice/loginSlice';

export default function LoginSuggestModal() {

    const isLoggedIn = useSelector(selectLoginStatus);

  return (
    <div className={`animate-justFloat ${isLoggedIn ? 'hidden' : 'block'} absolute pointer-events-none w-full h-[120px] bottom-[12px] flex items-center justify-center z-20`}>
      <div className='w-[550px] h-[120px] flex flex-col gap-[15px] items-center justify-center rounded-[20px] bg-loginSuggestModal text-white text-[20px] font-[700] pointer-events-auto'>
          <p>로그인하시면 더 많은 서비스를 이용해보실 수 있습니다.</p>
          <Link href="/login" className='hover:underline'>
            <p>로그인하기</p>
          </Link>
      </div>
    </div>
  )
}