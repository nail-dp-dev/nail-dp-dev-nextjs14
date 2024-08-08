'use client'

import { useSelector } from 'react-redux';
import LoginModal from './loginModal/LoginModal';
import { selectCommonModalStatus } from '../../../store/slices/modalSlice';
import ProfileImageCreateModal from './profileImageCreateModal/ProfileImageCreateModal';
import AlarmModal from './AlarmModal';

export default function CommonModalLayout() {

  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);

  return (
    <div className={`commonModal ${!isCommonModalShow && 'hidden'} absolute w-full h-full
      z-50 flex items-center justify-center pointer-events-auto
      bottom-0 right-0 bg-modalBackgroundColor`}>
      {
        whichCommonModal === 'login' &&
        <LoginModal />
      }
      {
        whichCommonModal === 'profile-create' &&
        <ProfileImageCreateModal />
      }
      {
        whichCommonModal === 'alarm' && 
        <AlarmModal/>
      }
    </div>
  )
}