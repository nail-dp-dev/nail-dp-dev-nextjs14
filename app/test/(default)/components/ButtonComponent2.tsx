'use client'

import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from '../../../../store/slice';
import { RootState } from '../../../../store/store';
import Link from 'next/link';

export default function ButtonComponent2() {

  const reduxTest = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>test 페이지의 default 컴포넌트 {reduxTest}</div>
      <Link href="/">
        home 으로
      </Link>
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
    </div>
  )
}