type SearchNoticeProps = {
  message: string;
};

// 검색 결과 페이지 Notice
export default function SearchNotice({ message }: SearchNoticeProps) {
  return (
    <div className="flex h-full w-full items-center justify-center ">
      <p className="text-lg font-semibold text-black">{message}</p>
    </div>
  );
}
