import Link from 'next/link';
import { headers } from 'next/headers';
import NailMoving from '../components/animations/NailMoving';

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get('host');

  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="relative">
        <NailMoving />
        <div className=" mx-auto my-0 text-center font-bold">
          <p className="text-10xl text-darkGray">404</p>
          <p className="text-3xl text-darkPurple ">PAGE NOT FOUND</p>
          <p className="text-4xl mt-9 ">페이지를 찾을 수 없습니다.</p>
        </div>
      </div>
    </div>
  );
}
