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
  success: boolean;
  message: string;
  kakaoUserInfoDto: {
    id: number;
    email: string;
    platform: string;
  };
};

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

export type PostSignUpData = {
  nickname: string;
  finalPhoneNumber: string;
  finalAgreement: boolean;
  router: any;
};

export type PostsDetailData = {
  success: boolean;
  code: number;
  data: {
    postId: number;
    nickname: string;
    profileUrl: string;
    followingStatus: boolean;
    followerCount: number;
    postImageUrls: string[];
    postContent: string;
    likeCount: number;
    commentCount: number;
    sharedCount: number;
    tags: {
      tagName: string;
    }[];
  };
};

export type PostCreateData = {
    postContent: string,
    tags: { tagName: string}[],
    tempSave: boolean,
    boundary:string,
    photos : {media_file:string}[]
};

export type TempPostCreateData = {
  postContent?: string,
  tags?: { tagName: string}[],
  tempSave: boolean,
  boundary:string,
  photos?: {media_file:string}[]
};