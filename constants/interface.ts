export interface CategoryElement {
  name: string;
  desc: string;
}

export interface CategoryBarProps {
  elements: CategoryElement[];
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

export interface ControlBarProps {
  archiveName: string;
}

export interface IconButtonProps {
  width: string;
  height: string;
  isClicked?: boolean;
  isGetAllLiked?: boolean;
  active?: boolean;
}

export interface PostBoxNewProps {
  postId: number;
  photoId: number;
  photoUrl: string;
  like?: boolean;
  saved: boolean;
  createdDate: any;
  tempPost?: boolean;
  setIsSuggestLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setSharedCount: React.Dispatch<React.SetStateAction<number>>;
  boundary: 'ALL' | 'FOLLOW' | 'NONE';
  isOptional: boolean;
}
export interface ArchiveBoxNewProps {
  showType: string;
  archiveId: number;
  photoId: number;
  photoUrl: string;
  like?: boolean;
  saved?: boolean;
  createdDate?: any;
  archiveName: string;
  postCount: number;
  initialBoundary: 'ALL' | 'FOLLOW' | 'NONE';
}

export interface ProfileMiniModalProps {
  isMiniModalShow: boolean;
  setIsMiniModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfileUrl: React.Dispatch<React.SetStateAction<string>>;
}
export interface PostsBoxProps {
  setIsSuggestLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuElementsProps {
  icon: string;
  url: string[];
  name: string;
  desc: string;
  isLast: boolean;
  where: string;
}

export interface ChattingBoxProps {
  isChatModalShow: boolean;
  handleCloseChatModal: (e: any) => void;
}
export interface ProfileProps {
  success: boolean;
  code: number;
  data: {
    nickname: string;
    postsCount: number;
    saveCount: number;
    followerCount: number;
    point: number;
  };
}

export interface ProfileButtonProps {
  nickname: string;
}

export interface SignUpAgreementProps {
  setProcedure: React.Dispatch<React.SetStateAction<string>>;
  setFinalAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SignUpPhoneNumberProps {
  setProcedure: React.Dispatch<React.SetStateAction<string>>;
  setFinalPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

export interface SignUpNickNameProps {
  finalAgreement: boolean;
  finalPhoneNumber: string;
}

export interface SignUpInfoBoxProps {
  procedure: string;
}

export interface ProcedureUIProps {
  now_procedure: string;
  this_procedure: string;
  number: number;
  name: string;
}

export interface PostCreateModalProps {
  isOverFileType: string;
  isOverFileMemory: number;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MyPageModalProps {
  isText: string;
  // setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PostsDataProps {
  category: string;
  size: number;
  cursorId?: number;
}

export interface PostsLikedDataProps {
  category: string;
  size: number;
  cursorLikedId?: number;
}

export interface ArchiveDataProps{
  archiveId: number;
  size: number;
  cursorId?: number;
}

export interface ArchivesDataProps {
  category: string;
  cursorId?: number;
}

export interface VideoProps {
  src: string;
  width: string;
  height: string;
}

export interface archiveArray {
  archiveId: number;
  archiveImgUrl: string;
  archiveName: string;
  boundary: string;
  isPhoto: string;
  isVideo: string;
  postCount: number;
}

export interface AlarmModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export interface postData {
  postId: number;
  photoId: number;
  photoUrl: string;
  isPhoto: boolean;
  isVideo: boolean;
  like: boolean;
  saved: boolean;
  createdDate: string;
  boundary: string;
}

export interface tempData {
  isPhoto: boolean;
  isVideo: boolean;
  photoId: number;
  photoUrl: string;
  postId: number;
  boundary: string;
}
