import BigNdpIcon from '../../../../public/assets/svg/big-logo.svg'
import LittleCircle from '../../../../public/assets/svg/procedure_circle.svg'
import { SignUpInfoBoxProps } from '../../../../constants/interface'
import { signUpProcedureLists } from '../../../../constants'
import ProcedureNumber from './ProcedureNumber'


export default function ProcedureInfoBox({ procedure }: SignUpInfoBoxProps) {  

  const circleNumberArray = Array(3).fill(null)

  return (
    <div className='relative w-full h-[100px] md:h-[150px] lg:h-[280px] flex flex-col items-center justify-start transition-all'>
      <BigNdpIcon className='absolute translate-x-[-245px] z-0 xs:hidden sm:hidden lg:block' />
      <div className='w-[158px] h-[50px] flex items-start justify-center gap-[4px] lg:mt-[50px] z-10'>
        <ProcedureNumber now_procedure={procedure} this_procedure={signUpProcedureLists[0].procedure} number={signUpProcedureLists[0].number} name={signUpProcedureLists[0].name}  />
        <div className='flex h-[24px] items-center justify-center gap-[2px] '>
          {
            circleNumberArray.map((_,i) => (
              <LittleCircle key={i} color={`${procedure === 'agreement' ||  procedure === 'phone' ? '#B98CE0' : '#E0DEE3' }`} className='transition-all'  />
            ))
          }
        </div>
        <ProcedureNumber now_procedure={procedure} this_procedure={signUpProcedureLists[1].procedure} number={signUpProcedureLists[1].number} name={signUpProcedureLists[1].name}  />
        <div className='flex h-[24px] items-center justify-center gap-[2px]'>
          {
            circleNumberArray.map((_,i) => (
              <LittleCircle key={i} color={`${procedure !== 'agreement' &&  procedure !== 'phone' ? '#B98CE0' : '#E0DEE3' }`} className='transition-all'  />
            ))
          }
        </div>
        <ProcedureNumber now_procedure={procedure} this_procedure={signUpProcedureLists[2].procedure} number={signUpProcedureLists[2].number} name={signUpProcedureLists[2].name}  />
      </div>
        {
          signUpProcedureLists.map((list, index) => (       
            <div key={index} className={`${list.procedure === procedure ? 'block' : 'hidden'} w-full min-h-[20px] lg:w-[444px] md:h-[97px] lg:mt-[44px] whitespace-nowrap flex flex-col items-center justify-between z-10`}>
              <p className='font-[700] md:text-[2rem]'>{list.fisrtDesc}</p>
              <p className='font-[700] md:text-[1.75rem]'>{list.secondDesc}</p>
            </div>
          ))
        }
    </div>
  )
}