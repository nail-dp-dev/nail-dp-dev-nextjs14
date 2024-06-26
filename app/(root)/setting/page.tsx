import ThemeToggle from './components/ThemeToggle';

export default function SettingPage() {
  return (
    <section className="SettingContainer w-full h-full">
      <div className="bg-white dark:bg-themeDark">
        <p className="text-textBlack dark:text-white">
          이 텍스트는 라이트 모드에서는 백그라운드가 흰색이고, 다크 모드에서는
          백그라운드가 검정색입니다.
        </p>
        <ThemeToggle />
      </div>
      <div>
        <img src="" alt="" />
        <button className="button-layout bg-purple">기본 버튼 레이아웃</button>
        <button className="button-layout py-[9.5px] px-[33px] button-tt  bg-buttonLightGray text-textBlack">
          임시 저장
        </button>
        <button className="button-layout py-[5.5px] px-[10px] button-color">
          새로운 아카이브 만들기
        </button>
        <button className="button-layout  py-[9.5px] px-[21px] button-color">
          사진 추가하기
        </button>
        <button className="hashtag-layout hashtag-hover-active button-tr-tf bg-lightGray button-transition">
          #케어
        </button>
        <button className="hashtag-layout hashtag-hover-active button-tr bg-purple">
          #라운드
        </button>
      </div>
    </section>
  );
}
