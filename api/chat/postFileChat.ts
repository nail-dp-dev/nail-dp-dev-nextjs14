export const postFileChat = async (fileList: FileList, chatRoomId: string) => {
  try {
    if (fileList.length === 0) {
      throw new Error('파일이 없습니다.');
    }

    const multipartFormData = new FormData();

    // FileList는 배열처럼 동작하지만 배열은 아니므로 반복문을 사용해야 합니다.
    Array.from(fileList).forEach((file) => {
      multipartFormData.append('file', file, file.name);
    });

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/chat/${chatRoomId}/file`, {
      method: 'POST',
      credentials: 'include',
      body: multipartFormData,
    });

    if (!response.ok) {
      throw new Error('HTTP error! Status: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('네트워크 오류 또는 잘못된 JSON:', error);
    } else if (error instanceof Error && error.message.startsWith('HTTP error!')) {
      console.error('서버가 오류 응답을 반환했습니다:', error);
    } else {
      console.error('예상치 못한 오류:', error);
    }
  }
};
