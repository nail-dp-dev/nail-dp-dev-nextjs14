"use client";

import DownloadIcon from "../../public/assets/svg/download.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../lib/store";
import { decrement, increment } from "../../lib/features/example/exampleSlice";

export default function Home() {
  const reduxTest = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  return (
    <main className="w-[100%] h-[100%] flex flex-col">
      Home page 입니다.
      <DownloadIcon fill="#04fa9a" />
      {/* Redux 상태 테스트 */}
      <div>Hello world! {reduxTest}</div>
      <div>
        <button
          className="px-4 py-2 text-black"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <button
          className="px-4 py-2 text-black "
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
    </main>
  );
}
