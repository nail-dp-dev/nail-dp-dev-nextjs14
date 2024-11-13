'use client';

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { getAlarmSse } from '../../api/alarm/getAlarmSse';
import { selectLoginStatus } from '../slices/loginSlice';

export default function AlarmSSEProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();
  const isLoggedIn = useSelector(selectLoginStatus);

  useEffect(() => {
    async function requestNotificationPermission() {
      if (Notification.permission === 'default') {
        const permission = await Notification.requestPermission();
        return permission === 'granted';
      }
      return Notification.permission === 'granted';
    }

    async function initializeSSE() {
      const hasPermission = await requestNotificationPermission();
      if (hasPermission && isLoggedIn === 'loggedIn') {
        const eventSource = getAlarmSse(dispatch);
        console.log(eventSource);
        return () => {
          console.log('에러 발생 종료');
          eventSource.close();
        };
      } else if(isLoggedIn === "pending"){
        console.log('pending 입니다.');
      }else{
        console.log('알림 권한이 없어 SSE 연결을 시작하지 않습니다.');

      }
    }

    initializeSSE();

  }, [dispatch, isLoggedIn]);

  return <>{children}</>;
}
