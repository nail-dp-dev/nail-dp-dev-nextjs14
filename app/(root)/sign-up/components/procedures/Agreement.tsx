import CheckIcon from '../../../../../public/assets/svg/check.svg'

export default function Agreement() {
  return (
    <div className='w-[440px] h-[450px] p-[20px] flex flex-col items-center justify-between bg-white rounded-[20px] shadow-signup-modal-shadow'>
      <div className='w-[400px] h-[60px] flex items-center justify-start gap-[9px] p-[14px] border-buttonDarkGray border-[2px] cursor-pointer rounded-[12px] group hover:border-purple'>
        <button className='w-[30px] h-[30px] flex items-center justify-center border-buttonDarkGray border-[2px] rounded-[12px] group-hover:bg-purple group-hover:border-none'>
          <CheckIcon fill='white'/>
        </button>
        <span className='h-[30px] text-[1.125rem] font-[700] text-center'>전체 동의하기</span>
      </div>
    </div>
  )
}