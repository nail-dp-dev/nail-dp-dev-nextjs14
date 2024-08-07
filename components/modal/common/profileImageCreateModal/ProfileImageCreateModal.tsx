'use client'

import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from '../../../../store/slices/modalSlice';


export default function ProfileImageCreateModal() {

  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);

  const dispatch = useDispatch();
  const handleModalClose = (e:any) => {
    e.stopPropagation()
    dispatch(commonModalClose());
  };

  return (
    whichCommonModal === 'profile-create' &&
    <div className={`commonModal ${!isCommonModalShow && 'hidden'} absolute w-screen h-screen z-50 flex items-center justify-center pointer-events-auto bg-modalBackgroundColor`}>
      <div className='w-[800px] h-[600px] flex flex-col items-center justify-center border-[1px] rounded-[12px] bg-white border-purple overflow-hidden'>
      


      </div>
    </div>
  )
}