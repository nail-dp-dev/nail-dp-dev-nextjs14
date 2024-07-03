import { SignUpPhoneNumberProps } from '../../../../../constants/interface';
import PhoneIcon from '../../../../../public/assets/svg/procedure_phone.svg'

export default function PhoneNumberValidation({ setProcedure, setFinalPhoneNumber }: SignUpPhoneNumberProps) {
  
  const handleVerifyBtn = (e:any, setProcedure:any) => {
    e.stopPropagation()
    setFinalPhoneNumber('010-1234-5678')
    setProcedure('nickname')
  }

  return (
    <div className='w-[440px] h-[450px] pt-[120px] p-[20px] flex flex-col items-center gap-[92px] justify-start bg-white rounded-[20px] shadow-signup-modal-shadow'>
      <PhoneIcon/>
      <button 
        className='submitBtn w-[400px] h-[60px] button-color button-layout button-tr button-tr-tf'
        onClick={(e) => handleVerifyBtn(e,setProcedure)}
        >
        <span className='text-[1.125rem]'>휴대폰 인증하기</span>
      </button>
    </div>
  )
}