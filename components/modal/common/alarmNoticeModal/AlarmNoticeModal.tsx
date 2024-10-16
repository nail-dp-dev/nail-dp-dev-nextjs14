'use client'

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from '../../../../store/slices/modalSlice';

export default function AlarmModal() {

  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);

  const dispatch = useDispatch();
  const handleModalClose = (e:any) => {
    e.stopPropagation()
    dispatch(commonModalClose());
  };
  
  return (
    whichCommonModal === 'alarm-notice' &&
    <div className={`commonModal ${!isCommonModalShow && 'hidden'} absolute w-screen h-screen bg-red
      z-50 flex items-center justify-center 
      `}>

    </div>
  )
}