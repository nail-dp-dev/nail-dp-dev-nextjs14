type ToggleProps = {
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
  showGeneralAction?: boolean;
};

const Toggle = ({ onClick, className, showGeneralAction }: ToggleProps) => {
  return (
    <svg
      width="13"
      height="28"
      viewBox="0 0 13 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      className={`${className} group`}
    >
      <g filter="url(#filter0_d_549_794)">
        <circle
          cx="5.5"
          cy="5"
          r="2"
          className={`${showGeneralAction ? 'fill-darkPurple' : 'fill-white group-hover:fill-purple group-active:fill-darkPurple'}`}
        />
        <circle
          cx="5.5"
          cy="13"
          r="2"
          className={`${showGeneralAction ? 'fill-darkPurple' : 'fill-white group-hover:fill-purple group-active:fill-darkPurple'}`}
        />
        <circle
          cx="5.5"
          cy="21"
          r="2"
          className={`${showGeneralAction ? 'fill-darkPurple' : 'fill-white group-hover:fill-purple group-active:fill-darkPurple'}`}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_549_794"
          x="0.5"
          y="0"
          width="12"
          height="28"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="1" dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_549_794"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_549_794"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Toggle;
