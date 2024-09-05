type SearchNoticeProps = {
  message: string;
};

export default function SearchNotice({ message }: SearchNoticeProps) {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <p className="text-lg font-semibold text-black">{message}</p>
    </div>
  );
}
