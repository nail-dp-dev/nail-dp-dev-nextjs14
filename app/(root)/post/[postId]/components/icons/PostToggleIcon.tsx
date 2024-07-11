type IconProps = {
  className?: string;
  onClick?: (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
  onTouchStart?: (e: React.TouchEvent<SVGSVGElement>) => void;
};
export default function PostToggleIcon({
  className,
  onClick,
  onTouchStart,
}: IconProps) {
  return (
    <svg
      className={`${className}`}
      onClick={onClick}
      onTouchStart={onTouchStart}
      width="10"
      height="6"
      viewBox="0 0 10 6"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.133201 5.26459L4.67843 0.635479C4.76368 0.548554 4.87937 0.499712 5 0.499713C5.12064 0.499713 5.23632 0.548554 5.32158 0.635479L9.8668 5.26459C10.0444 5.44547 10.0444 5.73873 9.8668 5.91961C9.6892 6.10049 9.22365 5.91961 9.22365 5.91961L5 3.83305L0.77635 5.91961C0.77635 5.91961 0.310801 6.10049 0.133201 5.91961C-0.0444002 5.73873 -0.0444002 5.44547 0.133201 5.26459Z"
      />
    </svg>
  );
}
