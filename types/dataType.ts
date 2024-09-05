import { AppDispatch } from '../store/store';

export type UserData = {
  success: boolean;
  code: number;
  data: {
    followingCount: number | undefined;
    nickname: string;
    postsCount: number;
    saveCount: number;
    followerCount: number;
    point: number;
    profileUrl: string;
    folloingCount: number;
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

export type AllPostsData = {
  code: number;
  message: string;
  data: {
    totalPage: number;
    totalElements: number;
    first: boolean;
    last: boolean;
    size: number;
    content: [
      {
        postId: number;
        photoId: number;
        photoUrl: string;
        like: boolean;
        saved: boolean;
        boundary: 'ALL' | 'FOLLOW' | 'NONE';
      },
    ];
    number: number;
    sort: {
      empty: boolean;
      sorted: boolean;
      unsorted: boolean;
    };
    numberOfElements: number;
    pageable: {
      pageNumber: number;
      pageSize: number;
      sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
      };
      offset: number;
      paged: boolean;
      unpaged: boolean;
    };
    empty: boolean;
  };
};

export type PostArray = {
  postId: number;
  photoId: number;
  photoUrl: string;
  like: boolean;
  saved: boolean;
  createdDate: any;
  boundary: string;
};

export type ArchiveArray = {
  postId: number;
  photoId: number;
  photoUrl: string;
  like: boolean;
  saved: boolean;
  createdDate: any;
  boundary: string;
};

export type ArchivesData = {
  success: boolean;
  code: number;
  data: Array<{
    postId: number;
    photoId: number;
    photo_url: string;
    like: boolean;
    saved: boolean;
  }>;
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

export type PostSignUpData = {
  nickname: string;
  finalPhoneNumber: string;
  finalAgreement: boolean;
  router: any;
  dispatch: AppDispatch;
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
    files: {
      fileUrl: string;
      photo: boolean;
      video: boolean;
    }[];
    postContent: string;
    likeCount: number;
    liked: boolean;
    commentCount: number;
    sharedCount: number;
    tags: string[];
    boundary: 'ALL' | 'FOLLOW' | 'NONE';
  };
};
export type CommentData = {
  success: boolean;
  code: number;
  postId: number;
  data: {
    length: number;
    contents: {
      content: Comment[];
      empty: boolean;
      first: boolean;
      last: boolean;
      number: number;
      numberOfElements: number;
      size: number;
      sort: { empty: boolean; unsorted: boolean; sorted: boolean };
      pageable: Pageable;
    };
    cursorId: number;
  };
};

export type Comment = {
  commentId: number;
  profileUrl: string;
  commentUserNickname: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
  liked?: boolean;
  replies?: Reply[];
  edited?: boolean;
  replyCount: number;
};

export type Pageable = {
  pageNumber: number;
  pageSize: number;
  sort: { empty: boolean; unsorted: boolean; sorted: boolean };
  offset: number;
  paged: boolean;
  unpaged: boolean;
};

export type ReplyData = {
  success: boolean;
  code: number;
  commentId: number;
  data: Reply[];
};

export type Reply = {
  replyId: number;
  profileUrl: string;
  commentUserNickname: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
  liked?: boolean;
  edited?: boolean;
};
export type PostCreateData = {
  postContent: string;
  tags: { tagName: string }[];
  tempSave: boolean;
  boundary: string;
  photos: { media_file: string }[];
};

export type TempPostCreateData = {
  postContent?: string;
  tags?: { tagName: string }[];
  tempSave: boolean;
  boundary: string;
  photos?: { media_file: string }[];
};
