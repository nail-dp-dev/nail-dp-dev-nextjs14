import NdpIcon from '../../public/assets/svg/nail-logo-small.svg'

export default function PersonalInformationCollectionAgreementRequiredComponent({ isSmall }: { isSmall: boolean }) {

  return(
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          { !isSmall && <NdpIcon />}
          <span className={`${isSmall ? 'text-[16px]' : 'text-[24px]'} font-[700] text-textDarkPurple`}>네디플 개인 정보 수집 동의서[필수]</span>
        </div>
        <div className='w-full min-h-[100px] rounded-[20px] gap-[10px] bg-lightPurple flex items-center justify-center text-start p-[20px]'>
          <span className={` ${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[350] text-textDarkPurple`}>
            네디플에 개인 정보를 제공함으로써 귀하는 아래에 명시된 대로 <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>귀하의 정보 수집 및 이용에 동의</span>합니다. 이 동의서는 필수 사항으로, <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>서비스 이용에 필요한 필수 정보 수집에 대한 동의</span>가 포함됩니다.
          </span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[30px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[350] text-[14px]'>개인정보 이용동의서</h2>
            <span className='font-[350] text-[14px]'>유효일: {`[24.11.01 부터]`}</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>1. 소개</h2>
            <span className='font-[350] text-[14px]'>본 개인정보 이용 계약은 귀하가 당사 서비스를 이용할 때 당사 네디플(이하 {`"서비스"`}, {`"당사"`} 또는 {`"당사의"`})이 귀하의 개인정보를 수집, 사용 및 공유하는 방법을 간략히 설명합니다. 계정을 만들고 당사 플랫폼을 사용함으로써 귀하는 본 계약 및 개인정보 보호정책에 설명된 대로 귀하의 개인정보를 수집하고 사용하는 데 동의하게 됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>2. 당사가 수집하는 정보</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>귀하가 네디플에 등록하고 사용할 때 당사는 다음 유형의 개인정보를 수집할 수 있습니다.</span>
            <span className='font-[350] text-[14px]'>계정 세부정보:</span>
            <span className='font-[350] text-[14px]'>개인정보: 이름, 이메일 주소, 휴대전화번호, 닉네임.</span>
            <span className='font-[350] text-[14px] mb-[20px]'>계정 로그인 정보: 단순 로그인 자격 증명.</span>
            <span className='font-[350] text-[14px]'>주문 정보:</span>
            <span className='font-[350] text-[14px] mb-[20px]'>구매 세부정보: 주문한 상품, 배송 주소, 결제 세부정보에 대한 정보입니다.</span>
            <span className='font-[350] text-[14px]'>예약 정보:</span>
            <span className='font-[350] text-[14px] mb-[20px]'>네일샵 예약: 네일샵 상세정보, 예약시간, 보증금, 추가 예약정보입니다.</span>
            <span className='font-[350] text-[14px]'>사용 데이터:</span>
            <span className='font-[350] text-[14px] mb-[20px]'>이미지 및 디자인 생성 기능 사용을 포함하여 당사 플랫폼과의 상호 작용에 관한 데이터입니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>3. 정보 이용 목적</h2>
            <span className='font-[350] text-[14px]'>당사는 귀하의 개인정보를 다음과 같은 목적으로 사용합니다:</span>
            <span className='font-[350] text-[14px]'>서비스 이용에 필요한 정보를 수집하여 사용자를 식별하거나 활용하기 위해.</span>
            <span className='font-[350] text-[14px]'>귀하의 경험을 향상하고 서비스를 개선하기 위해.</span>
            <span className='font-[350] text-[14px]'>이미지 검색, 자료 검색, 제품 구매, 네일샵 예약을 용이하게 하기 위해.</span>
            <span className='font-[350] text-[14px]'>주문 처리 및 제품 배송을 위해.</span>
            <span className='font-[350] text-[14px]'>예약, 취소, 결제, 환불 관리를 위해</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>4. 귀하의 정보 공유</h2>
            <span className='font-[350] text-[14px]'>우리는 귀하의 개인 정보를 보호하기 위해 최선을 다하고 있습니다. 귀하의 개인정보는 다음과 같은 경우를 제외하고는 공유되지 않습니다.</span>
            <span className='font-[350] text-[14px]'>귀하의 동의 하에: 당사는 귀하의 개인 정보를 공유하기 전에 귀하의 허락을 구할 것입니다.</span>
            <span className='font-[350] text-[14px]'>서비스 제공자에게: 당사는 귀하의 데이터를 안전하게 유지하기 위해 서비스 제공을 지원하는 신뢰할 수 있는 제3자 회사와 정보를 공유할 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>5. 귀하의 권리</h2>
            <span className='font-[350] text-[14px]'>귀하는 귀하의 개인정보와 관련하여 다음과 같은 권리를 갖습니다.</span>
            <span className='font-[350] text-[14px]'>액세스 및 업데이트: 계정 설정을 통해 정보를 확인하고 업데이트할 수 있습니다.</span>
            <span className='font-[350] text-[14px]'>계정 삭제: 귀하는 언제든지 귀하의 계정 및 모든 관련 데이터를 삭제할 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>6. 데이터 보호</h2>
            <span className='font-[350] text-[14px]'>당사는 귀하의 개인정보를 무단 접근으로부터 보호하기 위해 다양한 보안 조치를 시행하고 있습니다. 그러나 어떤 온라인 플랫폼도 100% 보안을 보장할 수는 없습니다. 강력한 비밀번호를 사용하고 로그인 정보를 기밀로 유지하는 것이 좋습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>7. 본 계약의 변경 사항</h2>
            <span className='font-[350] text-[14px]'>당사는 본 개인정보 사용 계약을 주기적으로 업데이트할 수 있습니다. 모든 변경 사항은 알림 센터, 팝업 알림 또는 이메일을 통해 귀하에게 전달됩니다. 본 계약을 정기적으로 검토하실 것을 권장합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px] mb-[20px]'>8. 문의</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>본 계약이나 당사의 개인 정보 보호 관행에 관해 질문이 있는 경우 당사 고객 센터나 이메일을 통해 문의하시기 바랍니다. 문의사항이 있으신 경우, assistant@naildp.com으로 이메일을 보내주세요.</span>
            <span className='font-[350] text-[14px]'>네디플을 이용함으로써 귀하는 본 개인정보 이용계약을 읽고, 이해하고, 동의했음을 인정합니다.</span>
          </div>
          
        </div>
      </div>
    </div>
  )
}