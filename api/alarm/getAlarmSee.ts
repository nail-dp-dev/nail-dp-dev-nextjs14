export const getAlarmSee = async () => {
  const hasPermission = await requestNotificationPermission();
  if (!hasPermission) {
    console.log('알림 권한이 없어 알림을 받을 수 없습니다.');
    return;
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/notifications/subscribe`,
      {
        method: 'GET',
        headers: {
          Accept: 'text/event-stream',
        },
        credentials: 'include',
      }
    );

    if (!response.ok) {
      throw new Error('알림 구독에 실패했습니다.');
    }

    const reader = response.body!.getReader();
    const readStream = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('스트림이 종료되었습니다.');
          return;
        }
        const text = new TextDecoder().decode(value);
        displayNotification(text);
        readStream();
      });
    };

    readStream();
  } catch (error) {
    console.error('알림 요청 중 에러 발생:', error);
  }
};

// 알림 권한 요청
async function requestNotificationPermission() {
  if (Notification.permission === 'default') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return Notification.permission === 'granted';
}

// 알림 표시 함수
function displayNotification(message: string) {
  if (Notification.permission === 'granted') {
    new Notification('새 알림이 도착했습니다!', {
      body: message,
    });
  } else {
    console.log('알림 권한이 없어 푸시 알림을 표시할 수 없습니다.');
  }
}

requestNotificationPermission().then((hasPermission) => {
  if (hasPermission) {
    getAlarmSee();
    setInterval(getAlarmSee, 10 * 60 * 1000);
  } else {
    console.log('알림 권한이 없어 알림을 받을 수 없습니다.');
  }
});
