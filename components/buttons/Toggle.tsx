type ToggleProps = {
  onClick?: () => void;
  width?: string;
  height?: string;
  className?: string;
};

const Toggle = ({
  onClick,
  width = '10px',
  height = '20px',
  className,
}: ToggleProps) => {
  return (
    <svg
      onClick={onClick}
      width={width}
      height={height}
      viewBox="0 0 4 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} button-tr hover:fill-purple active:fill-darkPurple stroke-[0.2px] stroke-black`}
    >
      <circle cx="2" cy="2" r="2" />
      <circle cx="2" cy="10" r="2" />
      <circle cx="2" cy="18" r="2" />
    </svg>
  );
};

export default Toggle;
