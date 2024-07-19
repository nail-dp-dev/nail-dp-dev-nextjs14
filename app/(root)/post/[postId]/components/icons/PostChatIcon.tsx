interface IconProps {
  className?: string;
  onClick?: () => void;
}

export default function PostChatIcon({ className ,onClick}: IconProps) {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.1719 10C11.1719 10.6213 10.6682 11.125 10.0469 11.125C9.42555 11.125 8.92188 10.6213 8.92188 10C8.92188 9.37868 9.42555 8.875 10.0469 8.875C10.6682 8.875 11.1719 9.37868 11.1719 10ZM5.92188 8.875C5.30055 8.875 4.79688 9.37868 4.79688 10C4.79688 10.6213 5.30055 11.125 5.92188 11.125C6.5432 11.125 7.04688 10.6213 7.04688 10C7.04688 9.37868 6.5432 8.875 5.92188 8.875ZM14.1719 8.875C13.5506 8.875 13.0469 9.37868 13.0469 10C13.0469 10.6213 13.5506 11.125 14.1719 11.125C14.7932 11.125 15.2969 10.6213 15.2969 10C15.2969 9.37868 14.7932 8.875 14.1719 8.875ZM19.7969 10C19.7976 13.424 18.0022 16.5975 15.0669 18.3605C12.1316 20.1234 8.48665 20.2174 5.46438 18.6081L2.27219 19.6722C1.73314 19.852 1.13879 19.7117 0.736985 19.3099C0.335183 18.9081 0.19492 18.3137 0.374687 17.7747L1.43875 14.5825C-0.466385 11.0006 0.0456171 6.61332 2.72434 3.56638C5.40306 0.519438 9.68864 -0.550316 13.485 0.880322C17.2815 2.31096 19.7952 5.94298 19.7969 10ZM18.2969 10C18.2959 6.53154 16.1256 3.43408 12.8659 2.24891C9.60619 1.06374 5.9533 2.04399 3.72488 4.70188C1.49646 7.35977 1.16845 11.1276 2.90406 14.1306C3.01157 14.3167 3.03411 14.5399 2.96594 14.7437L1.79688 18.25L5.30312 17.0809C5.37949 17.0549 5.45963 17.0416 5.54031 17.0416C5.67203 17.0418 5.80137 17.0767 5.91531 17.1428C8.46798 18.6197 11.6149 18.6217 14.1694 17.148C16.7239 15.6743 18.2976 12.9491 18.2969 10Z"
        // fill="#756982"
      />
    </svg>
  );
}
