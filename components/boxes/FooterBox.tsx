'use client';

import Link from 'next/link';
import { FooterElements } from '../../constants';
import { usePathname } from 'next/navigation';

export default function FooterBox() {
  const path = usePathname();

  return (
    <div className={`${path === '/sign-up' && 'hidden'} w-full md:min-h-[90px] lg:min-h-[50px] ${path !== '/sign-up' && 'xs:hidden sm:hidden md:block'}`}>
      <div className='w-full h-full flex flex-col items-center justify-end'>
        <span className="text-textDarkPurple text-[6px] font-[200] xs:text-[10px] sm:text-[12px]">
          네디플 | 대표 이소미 | 울산광역시 북구 당수골 6길 22 (2층 네디플) | 사업자등록번호 311-23-01965 | 대표 번호 052-293-5876
        </span>
        <span className='ml-[4px] text-[6px] text-textDarkPurple font-[400]'>
        {FooterElements.map((ele, index) => (
            <Link key={index} href={ele.uri}>
              <span className="text-gray hover:font-[700]  hover:text-darkPurple xs:text-[10px] md:text-[12px] mr-[4px]">
                {ele.name}
                {index < FooterElements.length - 1 && (
                <span className="text-gray  hover:text-darkPurple xs:mx-[5px] xs:text-[10px] md:text-[12px] ml-[5px]">
                  |
                </span>

                )}
              </span>
            </Link>
        ))}
        </span>
      </div>
    </div>
  );
}

