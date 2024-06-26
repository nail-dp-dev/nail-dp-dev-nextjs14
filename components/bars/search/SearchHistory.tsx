import SearchWord from './SearchWord';
import HistoryButton from '../../buttons/HistoryButton';
import SearchFollow from './SearchFollow';

export default function SearchHistory() {
  return (
    <div className="topContainer mt-[4.5rem] ">
      <div className="border-2 flex text-sm font-normal text-darkPurple absolute right-0 pr-[0.5625rem]">
        <p>전체삭제</p>
        <p>&nbsp;&nbsp;|&nbsp;&nbsp;</p>
        <p>검색기록 자동저장 끄기</p>
      </div>
      <div className="border-2 border-red ">
        <p className="text-sm font-normal text-darkPurple mt-5 ">
          최근 검색 (최대 30개까지 보관)
        </p>
        <HistoryButton />
        {/* <SearchWord /> */}
        <SearchFollow />
      </div>
    </div>
  );
}
