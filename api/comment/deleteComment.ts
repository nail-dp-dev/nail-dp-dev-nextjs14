import { deleteCommentUnlike } from './deleteCommentUnlike';

export const deleteComment = async (
  postId: number,
  commentId: number,
): Promise<{ success: boolean; message: string } | null> => {
  try {
    // 댓글에 대한 연관된 모든 데이터를 삭제해야 오류 안뜸 ( 곧 지울 예정 )
    // 데이터베이스에서 외래 키 제약 조건으로 발생한 오류 ( 곧 지울 예정 )
    await deleteCommentUnlike(postId, commentId);

    const url = new URL(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/comment/${commentId}`,
    );

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
      throw new Error(
        `Failed to delete comment. Status: ${response.status}, Message: ${data?.message || 'No message'}`,
      );
    }

    return { success: true, message: 'Comment deleted successfully' };
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error deleting comment:', errorMessage);
    return null;
  }
};
