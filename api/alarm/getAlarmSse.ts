import { AppDispatch } from '../../store/store';
import {
  connectSSE,
  disconnectSSE,
  setSSEError,
} from '../../store/slices/sseSlice';
import { getUserData } from '../user/getUserData';

export const getAlarmSse = (dispatch: AppDispatch) => {
  const eventSource = new EventSource(
    `${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`,
    {
      withCredentials: true,
    },
  );

  eventSource.onopen = async() => {
    console.log('SSE 연결이 열렸습니다.');
    dispatch(connectSSE());
  };

  eventSource.addEventListener('sse', (e) => {
    const message = e.data;
    if (message.includes('EventStream')) {
      return;
    }
    displayNotification(message);
  });

  eventSource.onerror = async(e) => {
    const data = await getUserData();
    console.log('SSE 연결 오류 발생:', e);
    console.log('EventSource 상태:', eventSource.readyState);
    dispatch(setSSEError('SSE 연결 오류'));
    eventSource.close();
    if (data.code === 2000) {      
      setTimeout(() => {
        getAlarmSse(dispatch);
      }, 3000);
    }
  };

  return eventSource;
};

async function displayNotification(message: string) {
  if (Notification.permission === 'granted') {
    new Notification('새 알림이 도착했습니다!', {
      body: message,
    });
  }
}
