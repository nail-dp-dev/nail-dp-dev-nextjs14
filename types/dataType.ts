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
