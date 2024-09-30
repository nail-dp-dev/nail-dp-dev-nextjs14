import Link from 'next/link';
import { FooterElements } from '../../constants';

export default function FooterBox (){
  return (
    <div className='w-full xs:h-[30px] sm:h-[30px] translate-y-[-10px] flex flex-wrap items-center justify-center xs:gap-[5px] sm:gap-[10px]'>
      {
        FooterElements.map((ele, index) => (
          <div key={index}>
            <Link href={ele.uri}>
              <span className='font-[400] text-[6px]  xs:text-[10px] sm:text-[12px] text-gray hover:text-darkPurple'>{ ele.name }</span>
            </Link>
            {
              index < FooterElements.length - 1 && (
              <span className='xs:ml-[5px] sm:ml-[10px] text-[6px] xs:text-[10px] sm:text-[12px] font-[400] text-gray hover:text-darkPurple'>|</span>
            )
            }          
          </div>
        ))
      }
    </div>
  )
} 