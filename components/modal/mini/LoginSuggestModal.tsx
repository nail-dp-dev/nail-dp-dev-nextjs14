'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slice/loginSlice';
import { logInCommonModalOpen } from '../../../store/slice/modalSlice';

export default function LoginSuggestModal() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch();

  const handleLoginClick = () => {
    dispatch(logInCommonModalOpen());
  };
  

  return (
    <div className={`animate-justFloat ${isLoggedIn ? 'hidden' : 'block'} absolute pointer-events-none w-full h-[120px] bottom-[12px] flex items-center justify-center z-20`}>
      <div className='w-[550px] h-[120px] flex flex-col gap-[15px] items-center justify-center rounded-[20px] bg-loginSuggestModal text-white text-[20px] font-[700] pointer-events-auto'>
          <p>로그인하시면 더 많은 서비스를 이용해보실 수 있습니다.</p>
          <button onClick={handleLoginClick} className='hover:underline'>
            <p>로그인하기</p>
          </button>
      </div>
    </div>
  )
}