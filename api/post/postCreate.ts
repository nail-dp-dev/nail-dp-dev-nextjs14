export const postCreate = async (formData: {
  postContent: string;
  tags: { tagName: string }[];
  tempSave: boolean;
  boundary: string;
  photos: { mediaFile: FormData }[];
}) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ formData }),
    });
    const data = await response.json();
    if (data.code === 2001) {
      alert(data.message);
    } else if (data.code === 4001) {
      alert(data.message);
    } else {
      alert(data.message);
    }
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
