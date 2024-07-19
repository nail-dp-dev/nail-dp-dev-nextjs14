export interface CategoryElement {
  name: string;
  url: string;
}

export interface CategoryBarProps {
  elements: CategoryElement[];
}

export interface IconButtonProps {
  width: string;
  height: string;
  isClicked?: boolean;
}

export interface PostBoxNewProps {
  postId: number,
  photoId: number,
  photoUrl : string,
  like?:boolean,
  saved: boolean 
  createdDate: any,
}

export interface ProfileMiniModalProps {
  isMiniModalShow: boolean;
  setIsMiniModalShow: React.Dispatch<React.SetStateAction<boolean>>;
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

export interface PostsDataProps {
  category: string,
  size: number,
  oldestPostId ?: number
}

export interface VideoProps {
  src: string;
  width: string;
  height: string;
}