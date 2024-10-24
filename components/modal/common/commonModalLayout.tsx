'use client'

import { useDispatch, useSelector } from 'react-redux';
import LoginModal from './loginModal/LoginModal';
import { selectCommonModalStatus, commonModalClose } from '../../../store/slices/modalSlice';
import ProfileImageCreateModal from './profileImageCreateModal/ProfileImageCreateModal';
import AlarmModal from './AlarmModal';
import MyArchiveModal from './myArchiveModal/MyArchiveModal';
import AlarmNoticeModal from './alarmNoticeModal/AlarmNoticeModal';
import { useEffect, useRef } from 'react';
import RoadNameAddressModal from './settingModal/RoadNameAddress';
import SettingPhoneModal from './settingModal/SettingPhone';
import SettingEmailModal from './settingModal/SettingEmail';


export default function CommonModalLayout() {
  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);
  const dispatch = useDispatch();
  const divRef = useRef<HTMLDivElement>(null);

  const handleDeleteConfirm = () => {
    dispatch(commonModalClose());
  };

  const handleCancel = () => {
    dispatch(commonModalClose());
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (divRef.current && !divRef.current.contains(event.target as Node)) {
        handleDeleteConfirm();
      }
    };

    if (isCommonModalShow) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCommonModalShow]);

  return (
    <div
      className={`commonModal ${!isCommonModalShow && 'hidden'} absolute ${whichCommonModal === 'alarm-notice' ? 'w-[400px] h-[97%] right-5 bg-white shadow-black shadow-sm rounded-[20px] overflow-hidden' : 'w-full h-full bottom-0'} 
      z-50 flex items-center justify-center pointer-events-auto
      right-0 `}
      ref={divRef}
    >
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
        <AlarmModal onConfirm={handleDeleteConfirm} onCancel={handleCancel} /> 
      }
      {
        whichCommonModal === 'archive' && 
        <MyArchiveModal/>
      }
      {
        whichCommonModal === 'alarm-notice' &&
        <AlarmNoticeModal />
      }
      {
        whichCommonModal === 'road-address' && 
        <RoadNameAddressModal/>
      }
      {
        whichCommonModal === 'setting-email' && 
        <SettingEmailModal/>
      }
      {
        whichCommonModal === 'setting-phone' && 
        <SettingPhoneModal/>
      }
    </div>
  );
}
