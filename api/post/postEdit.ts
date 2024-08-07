export const postEdit = async (postData: {
  postId: string;
  postContent: string;
  tags: { tagName: string }[];
  tempSave: boolean;
  boundary: string;
  deletedFileUrls: string[];
  photos: File[];
}) => {
  try {
    const multipartFormData = new FormData();
    multipartFormData.append(
      'content',
      new Blob(
        [
          JSON.stringify({
            postContent: postData.postContent,
            tags: postData.tags,
            tempSave: postData.tempSave,
            boundary: postData.boundary,
            deletedFileUrls: postData.deletedFileUrls,
          }),
        ],
        { type: 'application/json' },
      ),
    );
    postData.photos.forEach((file) => {
      const blob = new Blob([file], { type: file.type });
      multipartFormData.append('photos', blob, file.name);
    });

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postData.postId}`,
      {
        method: 'PATCH',
        credentials: 'include',
        body: multipartFormData,
      },
    );
    const data = await response.json();
    if (data.code == 2001) {
      return true;
    }
    return false;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error or invalid JSON:', error);
      return false;
    } else if (
      error instanceof Error &&
      error.message.startsWith('HTTP error!')
    ) {
      console.error('Server returned an error response:', error);
      return false;
    } else {
      console.error('Unexpected error:', error);
      return false;
    }
  }
};
