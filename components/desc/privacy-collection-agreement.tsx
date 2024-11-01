import NdpIcon from '../../public/assets/svg/nail-logo-small.svg'

export default function PrivacyCollectionAgreementComponent({ isSmall }: { isSmall: boolean }) {

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          { !isSmall && <NdpIcon />}
          <span className={`${isSmall ? 'text-[16px]' : 'text-[24px]'} font-[700] text-textDarkPurple`}>네디플 개인 정보 수집 동의서</span>
        </div>
        <div className='w-full min-h-[100px] rounded-[20px] gap-[10px] bg-lightPurple flex items-center justify-center text-start p-[20px]'>
          <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[350] text-textDarkPurple`}>
            네디플에 개인 정보를 제공함으로써 귀하는 아래에 명시된 대로 <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'}font-[700]`}>귀하의 정보 수집 및 이용에 동의</span>합니다. 이 동의서는 선택 사항으로, <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>귀하의 마케팅 커뮤니케이션 수신에 대한 동의</span>도 포함됩니다.
          </span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[30px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>선택적 개인 정보 수집 항목</h2>
            <span className='font-[350] text-[14px]'>우리는 다음과 같은 개인 정보를 선택적으로 수집할 수 있습니다</span>
            <span className='font-[350] text-[14px]'>마케팅 정보: 제품 및 서비스에 대한 프로모션, 할인, 뉴스레터 등을 포함한 마케팅 커뮤니케이션 수신에 대한 동의.</span>
            <span className='font-[350] text-[14px]'>사용자 선호도: 귀하의 취향 및 선호도에 따라 맞춤형 서비스를 제공하기 위해 필요한 정보.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>개인 정보 수집 목적</h2>
            <span className='font-[350] text-[14px]'>귀하의 개인 정보는 다음과 같은 목적으로 사용될 수 있습니다</span>
            <span className='font-[350] text-[14px]'> -귀하의 관심사에 맞춘 마케팅 자료 및 프로모션 제공</span>
            <span className='font-[350] text-[14px]'> -네디플의 서비스 개선 및 사용자 경험 향상</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>마케팅 커뮤니케이션 수신 동의</h2>
            <span className='font-[350] text-[14px]'>귀하는 네디플로부터 마케팅 커뮤니케이션을 받는 것에 동의합니다. 이를 통해 귀하는 서비스 업데이트, 프로모션, 할인 등의 정보를 받을 수 있습니다.  원하실 경우 언제든지 마케팅 커뮤니케이션 수신을 거부할 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>정보 공유 및 공개</h2>
            <span className='font-[350] text-[14px]'>귀하의 개인 정보를 제3자에게 판매하거나 임대하지 않습니다. 귀하의 정보는 다음과 같은 경우에만 공유됩니다</span>
            <span className='font-[350] text-[14px]'> -마케팅 서비스 제공업체와 협력하여 프로모션 및 마케팅 활동을 진행할 때</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>정보 접근 및 관리 권한</h2>
            <span className='font-[350] text-[14px]'>귀하는 언제든지 귀하의 개인 정보에 접근하고 수정할 수 있으며, 마케팅 커뮤니케이션 수신 동의를 철회할 수 있는 권리가 있습니다. </span>
            <span className='font-[350] text-[14px]'>이를 원하실 경우 로그인 하신 후 {`[환경설정>알림설정]`} 에서 마케팅 알림 토글을 끄고 알림을 해제 할 수 있습니다. 또는 네디플 고객센터로 문의해 주십시오.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>정책 변경</h2>
            <span className='font-[350] text-[14px]'>우리는 이 정책을 수시로 업데이트할 수 있습니다. 변경 사항이 있을 경우 새로운 정책을 웹사이트에 게시하여 알려드리겠습니다. 귀하의 지속적인 서비스 이용은 업데이트된 정책에 동의하는 것으로 간주됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[14px]'>연락처 정보</h2>
            <span className='font-[350] text-[14px]'>우리의 개인 정보 수집 정책에 대한 질문이나 우려 사항이 있으시면 {`[고객센터 이메일: assistant@naildp.com]`}로 문의해 주십시오.</span>
          </div>
        </div>
      </div>
    </div>
  )
}