'use client'

import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { selectLoginStatus } from '../../../../store/slices/loginSlice';

export default function MyArchivePage() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const router = useRouter()

  useEffect(() => {
    if (isLoggedIn === 'loggedOut') {
      router.back()
    }
  },[])

  return (
    isLoggedIn === 'loggedIn' ?
    <div className="MyArchiveContainer w-full h-full bg-red flex flex-col">
      <nav className='w-full h-[66px] bg-white'>
        아카이브별
      </nav>
      MyArchiveContainer 입니다.
    </div>
    :
    isLoggedIn === 'pending' ?
    <div>
      pending...
    </div>
    :
    isLoggedIn == 'loggedOut' &&
    <div>
      로그인이 필요한 페이지입니다.
    </div>
  );
}
