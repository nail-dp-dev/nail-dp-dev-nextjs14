export type UserData = {
  success: boolean;
  code: number;
  data: {
    nickname: string;
    postsCount: number;
    saveCount: number;
    followerCount: number;
    point: number;
    profileUrl: string,
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
    code : number,
    message: string,
    data: {
        totalPage:number,
        totalElements:number,
        first:boolean,
        last:boolean,
        size:number,
        content: [ 
            {
                postId:number,
                photoId:number,
                photoUrl:string,
                like:boolean,
                saved:boolean
            },
        ],
        number:number,
        sort: {
            empty:boolean,
            sorted:boolean,
            unsorted:boolean
        },
        numberOfElements:number,
        pageable:{
            pageNumber:number,
            pageSize:number,
            sort:{
                empty:boolean,
                sorted:boolean,
                unsorted:boolean
            },
            offset:number,
            paged:boolean,
            unpaged:boolean
        },
        empty:boolean
    }
}

export type PostArray = {
  postId: number;
  photoId: number;
  photoUrl: string;
  like: boolean;
  saved: boolean;
  createdDate: any;
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
      fileExtension: 'photo' | 'video';
    }[];
    postContent: string;
    likeCount: number;
    commentCount: number;
    sharedCount: number;
    tags: {
      tagName: string;
    }[];
  };
};
export type CommentData = {
  success: boolean;
  code: number;
  postId: number;
  data: Comment[];
};

export type Comment = {
  commentId: number;
  profileUrl: string;
  commentUserNickname: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
  replies?: Reply[];
};

export type Reply = {
  commentId: number;
  profileUrl: string;
  commentUserNickname: string;
  commentDate: string;
  commentContent: string;
  likeCount: number;
};

export type ReplyData = {
  success: boolean;
  code: number;
  commentId: number;
  data: Reply[];
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
