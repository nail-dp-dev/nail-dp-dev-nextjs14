import { AppDispatch } from '../../store/store';
import { connectSSE, disconnectSSE, setSSEError } from '../../store/slices/sseSlice';

export const getAlarmSee = (dispatch: AppDispatch) => {

  const eventSource = new EventSource(`${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`, {
    withCredentials: true,
  });

  eventSource.onopen = () => {
    dispatch(connectSSE());
  };

   eventSource.onmessage = (e) => {
    const message = e.data;
    if (message.includes("EventStream")) {
      return;
    }
    displayNotification(message);
  };

  eventSource.onerror = () => {
    dispatch(setSSEError("SSE 연결 오류"));
    eventSource.close();
    getAlarmSee(dispatch);
  };

  return eventSource;
};

function displayNotification(message: string) {
  if (Notification.permission === 'granted') {
    new Notification('새 알림이 도착했습니다!', {
      body: message,
    });
  } else {
    console.log('알림 권한이 없어 푸시 알림을 표시할 수 없습니다.');
  }
}
