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
  isClicked: boolean;
}

export interface PostBoxNewProps {
  item: {
    "success": boolean,
    "code": number,     
    "data": {
        "postId": number,
        "photoId": number,
        "photo_url" : string,
        "like":boolean,
        "saved":boolean 
    }
  };
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
