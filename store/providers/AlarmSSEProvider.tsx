'use client';

import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { getAlarmSee } from '../../api/alarm/getAlarmSee';

export default function AlarmSSEProvider({ children }: { children: React.ReactNode }) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const eventSource = getAlarmSee(dispatch);

    return () => {
      eventSource.close();
    };
  }, [dispatch]);

  return <>{children}</>;
}

