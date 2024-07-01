export type UserData = {
  success: boolean;
  code: number;
  data: {
    nickname: string;
    postsCount: number;
    saveCount: number;
    followerCount: number;
    point: number;
  };
};

export type SignUpData = {
  success: boolean,
  message: string,
  kakaoUserInfoDto: {
      id: number,
      email: string,
      platform: string
  }
}

export type PostsData = {
  success: boolean;
  code: number;
  data: Array<{
    postId: number;
    photoId: number;
    photo_url: string;
    like: boolean;
    saved: boolean;
  }>;
};