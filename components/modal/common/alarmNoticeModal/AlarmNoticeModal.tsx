'use client'

import React, { useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { commonModalClose, selectCommonModalStatus } from '../../../../store/slices/modalSlice';
import CloseIcon from '../../../../public/assets/svg/close.svg'
import RingIcon from '../../../../public/assets/svg/ring-icon.svg'
import BusinessIcon from '../../../../public/assets/svg/shop-icon.svg'
import { getAlarm } from '../../../../api/alarm/getAlarm';

export default function AlarmModal() {

  const { isCommonModalShow, whichCommonModal } = useSelector(selectCommonModalStatus);
  const dispatch = useDispatch();

  const handleModalClose = (e:any) => {
    e.stopPropagation()
    dispatch(commonModalClose());
  };

  const clickAlarmNotice = (e: any) => {
    e.stopPropagation()
    console.log('clickAlarm')
  }

  const fetchAlarmData = async () => {
    const alarmData = await getAlarm();
    console.log(alarmData);
    console.log("a");
  };
  
  useEffect(() => {
    fetchAlarmData()
  }, []);
  
  const dataArray = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26]

  return (
    whichCommonModal === 'alarm-notice' && isCommonModalShow &&
    <div className={`commonModal z-50 w-full h-full flex flex-col border-mainPurple border-[1px] rounded-[20px] overflow-hidden`}>
      <div className='topBar w-full h-[40px] flex items-center justify-between px-[15px] border-b-[1px] border-lightPurple'>
          <div className='flex items-center gap-[9px]'>
            <RingIcon />
            <span className='font-[700] text-textDarkPurple text-[1rem]'>알림센터</span>
          </div>
          <button
            onClick={handleModalClose}
          >
            <CloseIcon/>
          </button>
      </div>
      <div className='flex-1 flex-col overflow-hidden overflow-y-scroll px-[9px]'>
        <div className='notRead w-full h-[21px] mb-[5px]'>
          <span className='font-[700] text-[11px] text-textDarkPurple'>읽지 않음</span>
        </div>
        {
            dataArray.map((item, index) => (
            
            
              <div key={index} className={`w-full min-h-[62px]  ${index === 5 ? 'mb-[10px]' : 'mb-[5px]' }`}>
                <button 
                  onClick={(e)=>{clickAlarmNotice(e)}}
                  className='w-full h-[62px] flex items-center justify-between rounded-[12px] hover:bg-lightPurple pointer-events-auto px-[10px]'>
                  <div className='w-[290px] h-[42px] flex items-center gap-[10px]  '>
                    <div className='w-[40px] h-[40px] rounded-full overflow-hidden '>
                      <Image
                        src={'/assets/img/profile/basic/basic_1.png'} 
                        width={40} height={40} alt={'userProfileImage'} 
                        style={{objectFit: 'cover', width: '100%', height: '100%'}} 
                        quality={100} 
                        sizes='100vw' 
                        className='rounded-full' 
                      />
                    </div>
                    <div className='flex-1 h-[40px] flex flex-col items-start justify-center '>
                      <div className='flex items-center gap-[6px]'>
                        <span className='font-[700] text-[14px] text-textDarkPurple'>chainge</span>
                        <BusinessIcon/>
                        <span className='font-[400] text-[8px] text-dateGray'>방금전</span>
                      </div>
                      <div>
                        <span className='font-[400] text-[11px] text-textDarkPurple'>chainge님이 회원님의 게시물을 좋아합니다.</span>
                      </div>
                    </div>
                  </div>
                  <div className='w-[50px] h-[50px] rounded-[5px] overflow-hidden '>
                    <Image
                      src={'/assets/img/profile/basic/basic_4.png'} 
                      width={50} height={50} alt={'plusImage'} 
                      style={{objectFit: 'cover', width: '100%', height: '100%'}} 
                      quality={100} 
                      sizes='100vw' 
                    />
                  </div>
                </button>

                {
                  index === 5 &&
                  <div className='border-b-[1px] border-lightPurple w-full h-[10px]'></div>
                }
              </div>  

          ))
        }
      </div>
    </div>
  )
}