import { ProcedureUIProps } from '../../../../constants/interface'
import HeartIcon from '../../../../public/assets/svg/procedure_heart.svg'

export default function ProcedureNumber({now_procedure, this_procedure, number, name}:ProcedureUIProps) {
  return (
    <div className='relative flex flex-col items-center gap-[2px]'>
      <HeartIcon fill={`${now_procedure === this_procedure  ? '#B98CE0' : '#756982' }`} className='transition-all' />
      <span className={`absolute font-patua ${now_procedure === this_procedure ? 'text-[white]' : 'text-darkGray'} transition-colors font-PattuaOne`}>{number}</span>
      <div className='absolute translate-y-[25px] '>
        <span className={`font-[700] text-[0.5625rem] ${now_procedure === this_procedure ? 'text-purple' : 'text-darkGray'} text-center whitespace-nowrap transition-colors`}>{name}</span>
      </div>
    </div>
  )
}