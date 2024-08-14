'use client'

import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './loginModal/LoginModal';
import { selectCommonModalStatus, commonModalClose } from '../../../store/slices/modalSlice';
import ProfileImageCreateModal from './profileImageCreateModal/ProfileImageCreateModal';
import AlarmModal from './AlarmModal';
import MyArchiveModal from './myArchiveModal/MyArchiveModal';


export default function CommonModalLayout() {
  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);
  const dispatch = useDispatch();

  const handleDeleteConfirm = () => {
    dispatch(commonModalClose());
  };

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
        <AlarmModal onConfirm={handleDeleteConfirm} /> 
      }
      {
        whichCommonModal === 'archive' && 
        <MyArchiveModal/>
      }
    </div>
  );
}
