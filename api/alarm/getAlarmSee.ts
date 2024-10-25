export const getAlarmSee = async () => {
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
    console.log("1",response);
    const reader = response.body!.getReader();
    console.log("2",reader);
    console.log("3","연결");

    // 데이터를 읽는 함수 (함수 표현식 사용)
    const readStream = () => {
      reader.read().then(({ done, value }) => {
        if (done) {
          console.log('스트림이 종료되었습니다.');
          return;
        }

        const text = new TextDecoder().decode(value);
        console.log('푸시 알림:', text);
        displayNotification(text);

        // 다음 데이터를 계속 읽음
        readStream();
      });
    };

    // 스트림 읽기 시작
    readStream();
  } catch (error) {
    console.error('SSE 요청 중 에러 발생:', error);
  }
};

function displayNotification(message: string) {
  console.log("메세지",message);
  if (Notification.permission === 'granted') {
    new Notification('새 알림이 도착했습니다!', {
      body: "여기야",
      icon: '/path/to/icon.png',
    });
  } else {
    console.log('알림 권한이 없어 푸시 알림을 표시할 수 없습니다.');
  }
}
