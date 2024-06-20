export interface CategoryElement {
  name: string;
  url: string;
}

export interface CategoryBarProps {
  elements: CategoryElement[];
}

export interface HeartButtonProps {
  width: string;
  height: string;
  isClicked: boolean;
}

export interface PlusButtonProps {
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