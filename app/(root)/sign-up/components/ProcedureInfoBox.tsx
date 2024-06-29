import BigNdpIcon from '../../../../public/assets/svg/big-logo.svg'
import LittleCircle from '../../../../public/assets/svg/procedure_circle.svg'
import { SignUpInfoBoxProps } from '../../../../constants/interface'
import { circleNumberArray, signUpDescTextLists, signUpProcedureLists } from '../../../../constants'
import ProcedureNumber from './ProcedureNumber'


export default function ProcedureInfoBox({ procedure }: SignUpInfoBoxProps) {  

  return (
    <div className='relative w-full h-[280px] flex flex-col items-center justify-start transition-all'>
      <BigNdpIcon className='absolute translate-x-[-245px] z-0' />
      <div className='w-[158px] h-[50px] flex items-start justify-center gap-[4px] mt-[50px] z-10 '>
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
          signUpDescTextLists.map((list, index) => (       
            <div key={index} className={`${list.procedure === procedure ? 'block' : 'hidden'} w-[444px] h-[97px] mt-[44px] whitespace-nowrap flex flex-col items-center justify-between z-10`}>
              <p className='font-[700] text-[2rem]'>{list.fisrtDesc}</p>
              <p className='font-[700] text-[1.75rem]'>{list.secondDesc}</p>
            </div>
          ))
        }
    </div>
  )
}