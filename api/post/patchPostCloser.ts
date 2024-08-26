export const patchPostCloser = async (
  postId: number,
  closer: 'ALL' | 'FOLLOW' | 'NONE',
): Promise<{ success: boolean; message: string } | null> => {
  const url = new URL(
    `${process.env.NEXT_PUBLIC_API_URL}/posts/${postId}/closer`,
  );

  try {
    const response = await fetch(url.toString(), {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ closer }),
    });

    console.log('API Response Status:', response.status);
    const data = await response.json();
    console.log('API Response Data:', data);

    if (!response.ok) {
      throw new Error(
        `Failed to update post closer. Status: ${response.status}, Message: ${data?.message || 'No message'}`,
      );
    }

    return { success: true, message: 'Post closer updated successfully' };
  } catch (error) {
    const errorMessage = (error as Error).message || 'Unknown error';
    console.error('Error updating post closer:', errorMessage);
    return null;
  }
};