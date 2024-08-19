export const deleteUnlikeComment = async (
  postId: number,
  commentId: number,
) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to unlike comment');
  }

  return response.json();
};
