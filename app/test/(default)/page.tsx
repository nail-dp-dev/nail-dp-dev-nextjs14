import ButtonComponent2 from './components/ButtonComponent2';
import DownloadIcon from './../../../public/assets/svg/download.svg'

export default function TestPage() {

  return (
    <section className="w-full">
      Home page 입니다.
      {/* <DownloadIcon fill="#04fa9a" /> */} 예시
      {/* Redux 상태 테스트 */}
      <ButtonComponent2/>
      <DownloadIcon fill="#04fa9a" />
    </section>
  );
}
