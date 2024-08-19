export const deleteComment = async (
  postId: number,
  commentId: number,
): Promise<{ success: boolean; message: string } | null> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}`,
  );

  try {
    const response = await fetch(url.toString(), {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);

    if (!response.ok) {
      throw new Error(`Failed to delete comment. Status: ${response.status}, Message: ${data?.message || 'No message'}`);
    }

    return { success: true, message: 'Comment deleted successfully' };
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error deleting comment:', errorMessage);
    return null;
  }
};
