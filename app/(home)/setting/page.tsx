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
    </section>
  );
}
