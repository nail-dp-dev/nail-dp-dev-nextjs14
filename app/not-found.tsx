import Link from 'next/link';
import { headers } from 'next/headers';
import NailMoving from '../components/animations/NailMoving';

export default async function NotFound() {
  const headersList = headers();
  const domain = headersList.get('host');

  return (
    <div className=" w-screen h-screen flex justify-center items-center">
      <div className="relative text-center">
        <NailMoving />
        <div className="mx-auto my-0 font-bold">
          <div className="md:mb-0 mb-56">
            <p className="md:text-10xl text-6xl text-darkGray">404</p>
            <p className="md:hidden text-5xl text-darkGray">ERROR</p>
          </div>
          <div>
            <p className="md:text-3xl text-2xl text-darkPurple ">
              PAGE NOT FOUND
            </p>
            <p className="md:text-4xl text-xl md:mt-9 ">
              페이지를 찾을 수 없습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
