'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import {
  commonModalClose,
  selectCommonModalStatus,
} from '../../../../store/slices/modalSlice';
import CloseIcon from '../../../../public/assets/svg/close.svg';
import RingIcon from '../../../../public/assets/svg/ring-icon.svg';
import BusinessIcon from '../../../../public/assets/svg/shop-icon.svg';
import { getAlarm } from '../../../../api/alarm/getAlarm';
import { getAlarmSee } from '../../../../api/alarm/getAlarmSee';
import { PatchAlarm } from '../../../../api/alarm/PatchAlarm';

interface alarmData {
  createdDate: string;
  isRead: boolean;
  link: string;
  notificationContent: string;
  notificationId: number;
  notificationType: string;
  senderNickname: string;
  senderProfileUrl: string;
}

export default function AlarmModal() {
  const { isCommonModalShow, whichCommonModal } = useSelector(
    selectCommonModalStatus,
  );
  const [isAlarmData, setIsAlarmData] = useState<alarmData[]>([]);

  const dispatch = useDispatch();

  const handleModalClose = (e: any) => {
    e.stopPropagation();
    dispatch(commonModalClose());
  };

  const clickAlarmNotice = (e: any) => {
    e.stopPropagation();
    console.log('clickAlarm');
  };

  const fetchAlarmData = async () => {
    const alarmData = await getAlarm();
    setIsAlarmData(alarmData.data.content);
    const data = alarmData.data.content;
    const patchData = data
      .filter((item: { isRead: boolean }) => item.isRead === false)
      .map((item: { notificationId: number }) => item.notificationId);
    PatchAlarm(patchData);
  };

  const fetchAlarmDataSee = async () => {
    const fetchAlarmDataSee = await getAlarmSee();
    console.log(fetchAlarmDataSee);
  };

  useEffect(() => {
    fetchAlarmData();
    fetchAlarmDataSee();
  }, []);

  const line = isAlarmData
    .filter((item: { isRead: boolean }) => item.isRead === false)
    .map((item: { notificationId: number }) => item.notificationId);

  console.log(line.length);

  return (
    whichCommonModal === 'alarm-notice' &&
    isCommonModalShow && (
      <div
        className={`commonModal z-50 flex h-full w-full flex-col overflow-hidden rounded-[20px] border-[1px] border-mainPurple`}
      >
        <div className="topBar flex h-[40px] w-full items-center justify-between border-b-[1px] border-lightPurple px-[15px]">
          <div className="flex items-center gap-[9px]">
            <RingIcon />
            <span className="text-[1rem] font-[700] text-textDarkPurple">
              알림센터
            </span>
          </div>
          <button onClick={handleModalClose}>
            <CloseIcon />
          </button>
        </div>
        <div className="flex-1 flex-col overflow-hidden overflow-y-scroll px-[9px]">
          <div className="notRead mb-[5px] h-[21px] w-full">
            <span className="text-[11px] font-[700] text-textDarkPurple">
              읽지 않음
            </span>
          </div>
          {isAlarmData.map((item, index) => (
            <div
              key={index}
              className={`min-h-[62px] w-full  ${index === 5 ? 'mb-[10px]' : 'mb-[5px]'}`}
            >
              <button
                onClick={(e) => {
                  clickAlarmNotice(e);
                }}
                className="pointer-events-auto flex h-[62px] w-full items-center justify-between rounded-[12px] px-[10px] hover:bg-lightPurple"
              >
                <div className="flex h-[42px] w-[290px] items-center gap-[10px]  ">
                  <div className="h-[40px] w-[40px] overflow-hidden rounded-full ">
                    <Image
                      src={item.senderProfileUrl}
                      width={40}
                      height={40}
                      alt={'userProfileImage'}
                      style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                      }}
                      quality={100}
                      sizes="100vw"
                      className="rounded-full"
                    />
                  </div>
                  <div className="flex h-[40px] flex-1 flex-col items-start justify-center ">
                    <div className="flex items-center gap-[6px]">
                      <span className="text-[14px] font-[700] text-textDarkPurple">
                        {item.senderNickname}
                      </span>
                      <BusinessIcon />
                      <span className="text-[8px] font-[400] text-dateGray">
                        {item.createdDate}
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-[400] text-textDarkPurple">{`${item.senderNickname}님이 회원님의 게시물을 좋아합니다.`}</span>
                    </div>
                  </div>
                </div>
                <div className="h-[50px] w-[50px] overflow-hidden rounded-[5px] ">
                  <Image
                    src={'/assets/img/profile/basic/basic_4.png'}
                    width={50}
                    height={50}
                    alt={'plusImage'}
                    style={{
                      objectFit: 'cover',
                      width: '100%',
                      height: '100%',
                    }}
                    quality={100}
                    sizes="100vw"
                  />
                </div>
              </button>

              {index === line.length -1 && (
                <div className="h-[10px] w-full border-b-[1px] border-lightPurple"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    )
  );
}
