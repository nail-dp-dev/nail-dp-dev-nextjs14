export const formatTimeAgo = (dateString: string) => {
  // // 날짜 문자열 형식 확인
  // let formattedDateString;
  // if (dateString.length === 8) {
  //   // 'YYYYMMDD' 형식
  //   formattedDateString = `${dateString.substring(0, 4)}-${dateString.substring(4, 6)}-${dateString.substring(6, 8)}`;
  // } else {
  //   formattedDateString = dateString; // ISO 형식 등 다른 형식
  // }

  // const date = new Date(formattedDateString);
  // const now = new Date();
  // const diff = now.getTime() - date.getTime();

  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 1) return '방금 전';
  if (seconds < 60) return `${seconds}초 전`;
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  return `${days}일 전`;
};
