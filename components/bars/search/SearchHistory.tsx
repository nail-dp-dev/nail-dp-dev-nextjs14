import SearchWord from './SearchWord';
import HistoryButton from '../../buttons/HistoryButton';
import SearchFollow from './SearchFollow';

export default function SearchHistory() {
  return (
    <div className="topContainer mt-[4.5rem]">
      <div className="flex justify-end text-sm font-normal text-darkPurple">
        <p>전체삭제</p>
        <p className='mx-2 select-none'>|</p>
        <p>검색기록 자동저장 끄기</p>
      </div>
      <div className="">
        <p className="text-sm font-normal text-darkPurple ">
          최근 검색 (최대 30개까지 보관)
        </p>
        <HistoryButton />
        <SearchWord />
        <SearchFollow />
      </div>
    </div>
  );
}
