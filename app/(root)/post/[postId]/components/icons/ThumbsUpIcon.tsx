type IconProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onTouchStart?: (e: React.TouchEvent<SVGSVGElement>) => void;
};

export default function ThumbsUpIcon({ className, onClick, onTouchStart }: IconProps) {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      onTouchStart={onTouchStart}
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.2812 5.75938C16.9252 5.35594 16.4131 5.12489 15.875 5.125H11.5V3.875C11.5 2.14911 10.1009 0.75 8.375 0.75C8.13818 0.74983 7.9216 0.883527 7.81563 1.09531L4.86406 7H1.5C0.809644 7 0.25 7.55964 0.25 8.25V15.125C0.25 15.8154 0.809644 16.375 1.5 16.375H14.9375C15.8827 16.3753 16.6803 15.6721 16.7984 14.7344L17.7359 7.23438C17.8032 6.70023 17.6375 6.16297 17.2812 5.75938ZM1.5 8.25H4.625V15.125H1.5V8.25ZM16.4953 7.07812L15.5578 14.5781C15.5184 14.8907 15.2526 15.1251 14.9375 15.125H5.875V7.77266L8.74297 2.03594C9.61946 2.21136 10.2502 2.98112 10.25 3.875V5.75C10.25 6.09518 10.5298 6.375 10.875 6.375H15.875C16.0544 6.37494 16.2252 6.45198 16.3439 6.58652C16.4626 6.72106 16.5177 6.90012 16.4953 7.07812Z"
      />
    </svg>
  );
}
