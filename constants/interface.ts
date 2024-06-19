export interface CategoryElement {
  name: string;
  url: string;
}

export interface CategoryBarProps {
  elements: CategoryElement[];
}

export interface SizeProps {
  width: string;
  height: string;
}