import BigNdpIcon from '../../../../public/assets/svg/big-logo.svg'
import HeartIcon from '../../../../public/assets/svg/procedure_heart.svg'
import LittleCircle from '../../../../public/assets/svg/procedure_circle.svg'
import { SignUpInfoBoxProps } from '../../../../constants/interface'


export default function ProcedureInfoBox({ procedure }: SignUpInfoBoxProps) {
  
  const array = Array(3).fill(null)

  return (
    <div className='relative w-full h-[280px] flex flex-col items-center justify-start transition-all'>
      <div className='absolute translate-x-[-245px] z-0'>
        <BigNdpIcon />
      </div>
      <div className='w-[158px] h-[50px] flex items-start justify-center gap-[4px] mt-[50px] z-10 '>
        <div className='relative flex flex-col items-center gap-[2px]'>
          <HeartIcon fill={`${procedure === 'agreement'  ? '#B98CE0' : '#756982' }`} className='transition-all' />
          <span className={`absolute font-patua ${procedure === 'agreement' ? 'text-[white]' : 'text-darkGray'} transition-colors`}>1</span>
          <div className='w-[36px] h-[24px]'>
            <span className={`font-[700] text-[0.5625rem] ${procedure === 'agreement' ? 'text-purple' : 'text-darkGray'} transition-colors`}>약관 동의</span>
          </div>
        </div>
        <div className='flex h-[24px] items-center justify-center gap-[2px] '>
          {
            array.map((_,i) => (
              <LittleCircle key={i} color={`${procedure === 'agreement' ||  procedure === 'phone' ? '#B98CE0' : '#E0DEE3' }`} className='transition-all'  />
            ))
          }
        </div>
        <div className='relative flex flex-col items-center gap-[2px]'>
          <HeartIcon fill={`${procedure === 'phone'  ? '#B98CE0' : '#756982' }`} className='transition-all'/>
          <span className={`absolute font-patua ${procedure === 'phone' ? 'text-[white]' : 'text-darkGray'} transition-colors`}>2</span>
          <div className='w-[36px] h-[24px]'>
            <span className={`font-[700] text-[0.5625rem] ${procedure === 'phone' ? 'text-purple' : 'text-darkGray'} transition-colors`}>본인 인증</span>
          </div>
        </div>
        <div className='flex h-[24px] items-center justify-center gap-[2px]'>
          {
            array.map((_,i) => (
              <LittleCircle key={i} color={`${procedure !== 'agreement' &&  procedure !== 'phone' ? '#B98CE0' : '#E0DEE3' }`} className='transition-all'  />
            ))
          }
        </div>
        <div className='relative flex flex-col items-center gap-[2px]'>
          <HeartIcon fill={`${procedure === 'nickname'  ? '#B98CE0' : '#756982' }`} className='transition-all' />
          <span className={`absolute font-patua transition-colors ${procedure === 'nickname' ? 'text-[white]' : 'text-darkGray'}`}>3</span>
          <div className='absolute h-[24px] translate-y-[26px]'>
            <span className={`font-[700] text-[0.5625rem] whitespace-nowrap ${procedure === 'nickname' ? 'text-purple' : 'text-darkGray'} transition-colors`}>닉네임 설정</span>
          </div>
        </div>
      </div>
      <div className='w-[444px] h-[97px] mt-[44px] whitespace-nowrap flex flex-col items-center justify-between z-10'>
        {
          procedure === 'agreement' &&
          <>
          <p className='font-[700] text-[2rem]'>네디플에 오신 걸 환영해요!</p>
          <p className='font-[700] text-[1.75rem]'>서비스 이용과 가입을 위해 약관동의가 필요해요.</p>
          </>
        }
        {
          procedure === 'phone' &&
          <>
          <p className='font-[700] text-[2rem]'>안전한 서비스 이용을 위해</p>
          <p className='font-[700] text-[1.75rem]'>본인인증을 완료해주세요.</p>
          </>
        }
        {
          procedure === 'nickname' &&
          <>
          <p className='font-[700] text-[2rem]'>네디플에서 사용하실</p>
          <p className='font-[700] text-[1.75rem]'>별명은 무엇으로 할까요?</p>
          </>
        }
      </div>
    </div>
  )
}