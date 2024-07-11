interface IconProps {
  className?: string;
}

export default function PostHeartFillIcon({ className }: IconProps) {
  return (
    <svg
      className={`${className}`}
      width="22"
      height="19"
      viewBox="0 0 22 19"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M15.6875 0.5C13.7516 0.5 12.0566 1.3325 11 2.73969C9.94344 1.3325 8.24844 0.5 6.3125 0.5C3.10384 0.503617 0.503617 3.10384 0.5 6.3125C0.5 12.875 10.2303 18.1869 10.6447 18.4062C10.8665 18.5256 11.1335 18.5256 11.3553 18.4062C11.7697 18.1869 21.5 12.875 21.5 6.3125C21.4964 3.10384 18.8962 0.503617 15.6875 0.5Z"
      />
    </svg>
  );
}