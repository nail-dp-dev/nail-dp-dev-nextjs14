'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getAlarmSse } from '../../api/alarm/getAlarmSse';

export default function AlarmSSEProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

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
      if (hasPermission) {
        const eventSource = getAlarmSse(dispatch);

        return () => {
          eventSource.close();
        };
      } else {
        console.log('알림 권한이 없어 SSE 연결을 시작하지 않습니다.');
      }
    }

    initializeSSE();

  }, [dispatch]);

  return <>{children}</>;
}
