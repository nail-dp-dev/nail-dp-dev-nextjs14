export const patchEditComment = async (
  postId: number,
  commentId: number,
  commentContent: string,
): Promise<{ success: boolean; message: string } | null> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}`,
  );

  try {
    const response = await fetch(url.toString(), {
      method: 'PATCH',
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
      throw new Error(
        `Failed to update comment. Status: ${response.status}, Message: ${data?.message || 'No message'}`,
      );
    }

    return { success: true, message: 'Comment updated successfully' };
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error updating comment:', errorMessage);
    return null;
  }
};
