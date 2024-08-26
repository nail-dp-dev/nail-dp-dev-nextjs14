export const postCreateComment = async (
  postId: number,
  commentContent: string,
) => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment`;

  console.log('API URL:', url);
  console.log('Request body:', JSON.stringify({ commentContent }));

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ commentContent }),
    });

    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return data.data;
  } catch (error) {
    console.error('Error creating comment:', error);
    return null;
  }
};
