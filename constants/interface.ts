export interface CategoryElement {
  name: string;
  desc: string;
}

export interface CategoryBarProps {
  elements: CategoryElement[];
  category:string,
  setCategory: React.Dispatch<React.SetStateAction<string>>
}

export interface IconButtonProps {
  width: string;
  height: string;
  isClicked?: boolean;
  isGetAllLiked?: boolean;
  active?: boolean;
}

export interface PostBoxNewProps {
  postId: number,
  photoId: number,
  photoUrl : string,
  like?:boolean,
  saved: boolean 
  createdDate: any,
  tempPost?: boolean
  setIsSuggestLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface ArchiveBoxNewProps {
  archiveId: number,
  photoId: number,
  photoUrl : string,
  like?:boolean,
  saved?: boolean 
  createdDate?: any,
}

export interface ProfileMiniModalProps {
  isMiniModalShow: boolean;
  setIsMiniModalShow: React.Dispatch<React.SetStateAction<boolean>>;
  setUserProfileUrl: React.Dispatch<React.SetStateAction<string>>;
}
export interface PostsBoxProps {
  setIsSuggestLoginModalShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MenuElementsProps{
  icon: string;
  url: string[],
  name: string,
  desc: string,
  isLast: boolean;
  where: string;
}

export interface ChattingBoxProps {
  isChatModalShow: boolean;
  handleCloseChatModal: (e: any) => void;
}
export interface ProfileProps{
  "success": boolean,
  "code": number,  
    "data" :{
        "nickname": string,
        "postsCount": number,
        "saveCount" : number,  
        "followerCount" : number,
        "point" : number
    }
}

export interface ProfileButtonProps{
  nickname:string
}


export interface SignUpAgreementProps{
  setProcedure: React.Dispatch<React.SetStateAction<string>>;
  setFinalAgreement: React.Dispatch<React.SetStateAction<boolean>>;
}
export interface SignUpPhoneNumberProps{
  setProcedure: React.Dispatch<React.SetStateAction<string>>;
  setFinalPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
}

export interface SignUpNickNameProps{
  finalAgreement: boolean;
  finalPhoneNumber: string;
}

export interface SignUpInfoBoxProps{
  procedure: string;
}

export interface ProcedureUIProps {
  now_procedure: string,
  this_procedure: string,
  number: number,
  name: string
}

export interface PostCreateModalProps {
  isOverFileType: string,
  isOverFileMemory: number,
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface MyPageModalProps {
  isText: string,
  // setIsModal: React.Dispatch<React.SetStateAction<boolean>>
}

export interface PostsDataProps {
  category: string,
  size: number,
  cursorId ?: number
}
export interface PostsLikedDataProps {
  category: string,
  size: number,
  cursorLikedId ?: number
}

export interface VideoProps {
  src: string;
  width: string;
  height: string;
}