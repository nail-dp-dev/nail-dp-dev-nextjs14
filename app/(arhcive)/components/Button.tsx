'use client'

import Link from 'next/link';
import { decrement, increment } from '../../../store/slice';
import { RootState } from '../../../store/store';
import { useSelector, useDispatch } from "react-redux";

export default function ButtonComponent() {

  const reduxTest = useSelector((state: RootState) => state.example.value);
  const dispatch = useDispatch();

  return (
    <div>
      <div>Hello world! {reduxTest}</div>
        <Link href="/test">
        test 으로
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