export const followUser = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/follow`,
      {
        method: 'POST',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to follow user');
    }

    return true;
  } catch (error) {
    console.error('Error following user:', error);
    return false;
  }
};

export const unFollowUser = async (nickname: string): Promise<boolean> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/${nickname}/follow`,
      {
        method: 'DELETE',
        credentials: 'include',
      },
    );

    if (!response.ok) {
      throw new Error('Failed to unfollow user');
    }

    return true;
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return false;
  }
};
