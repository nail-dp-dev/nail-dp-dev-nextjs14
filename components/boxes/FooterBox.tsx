'use client';

import Link from 'next/link';
import { FooterElements } from '../../constants';
import { usePathname } from 'next/navigation';

export default function FooterBox() {
  const path = usePathname();

  return (
    <div
      className={`${path === '/sign-up' && 'hidden'} flex w-full translate-y-[-10px] flex-wrap items-center justify-center xs:h-[30px] xs:gap-[5px] sm:h-[30px] sm:gap-[10px] `}
    >
      <div className='flex'>
        {FooterElements.map((ele, index) => (
          <div key={index}>
            <Link href={ele.uri}>
              <span className="text-gray text-[6px]  font-[400] hover:text-darkPurple xs:text-[10px] sm:text-[12px]">
                {ele.name}
              </span>
            </Link>
            {index < FooterElements.length - 1 && (
              <span className="text-gray text-[6px] font-[400] hover:text-darkPurple xs:ml-[5px] xs:text-[10px] sm:ml-[10px] sm:text-[12px]">
                |
              </span>
            )}
          </div>
        ))}
      </div>
      <p className="text-gray text-[6px] font-[400] xs:text-[10px] sm:text-[12px]">
        네디플 / 대표 이소미 / 울산광역시 북구 당수골 6길 22 (2층 네디플) /
        사업자등록번호 311-23-01965 / 대표 번호 052-293-5876
      </p>
    </div>
  );
}
