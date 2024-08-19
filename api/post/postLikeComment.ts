export const postLikeComment = async (postId: number, commentId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}/like`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Failed to like comment');
    throw new Error('Failed to like comment');
  }

  console.log('Comment liked successfully');
  return response.json();
};

export const deleteUnlikeComment = async (postId: number, commentId: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}/like`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    console.error('Failed to unlike comment');
    throw new Error('Failed to unlike comment');
  }

  console.log('Comment unliked successfully');
  return response.json();
};
