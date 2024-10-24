'use client'

import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slices/loginSlice';
import { commonModalClose, setCommonModal } from '../../../store/slices/modalSlice';

export default function LoginSuggestModal() {

  const isLoggedIn = useSelector(selectLoginStatus);
  const dispatch = useDispatch();


  const handleLoginClick = () => {
    dispatch(commonModalClose())
    dispatch(setCommonModal('login'));
  };
  

  return (
    <div className={`animate-justFloat ${isLoggedIn === 'loggedIn' && 'hidden' } ${isLoggedIn === 'pending' && 'hidden'} ${isLoggedIn === 'loggedOut' && 'block'} absolute pointer-events-none w-full h-[120px] bottom-[12px] flex items-center justify-center z-20`}>
      <div className='xs:w-[90%] xs:h-[90px] sm:w-[400px] sm:h-[80px] md:w-[450px] md:h-[120px] lg:w-[550px] flex flex-col gap-[15px] items-center justify-center rounded-[20px] bg-loginSuggestModal text-white xs:text-[13px] sm:text-[13px] md:text-[20px] font-[700] pointer-events-auto'>
          <p>로그인하시면 더 많은 서비스를 이용해보실 수 있습니다.</p>
          <button onClick={handleLoginClick} className='hover:underline'>
            <p>로그인하기</p>
          </button>
      </div>
    </div>
  )
}