import NdpIcon from '../../public/assets/svg/nail-logo-small.svg'

export default function PrivacyPolicyComponent({ isSmall }: { isSmall: boolean }) {

  return(
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          { !isSmall && <NdpIcon />}
          <span className={`${isSmall ? 'text-[16px]' : 'text-[24px]'} font-[700] text-textDarkPurple`}>네디플 개인정보 보호정책</span>
        </div>
        <div className='w-full min-h-[100px] rounded-[20px] gap-[10px] bg-lightPurple flex items-center justify-center text-start p-[20px]'>
          <span className={` ${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[350] text-textDarkPurple`}>
            네디플에 오신 것을 환영합니다! 우리는 귀하의 개인 정보를 중요하게 생각하며 귀하가 플랫폼을 사용하는 동안 안전함을 느끼기를 바랍니다. 이 정책은 당사가
            <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}> 귀하의 개인정보를 수집, 사용 및 보호하는 방법 </span>
            을 설명합니다.
          </span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[30px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[18px]'>당사가 수집하는 정보</h2>
            <span className='font-[350] text-[14px]'>귀하가 네디플을 사용할 때 당사는 일부 개인정보를 요청할 수 있습니다. 여기에는 다음이 포함될 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px]'>계정 세부정보</h2>
            <span className='font-[350] text-[14px]'><span className='font-[500]'>개인정보 : 회원가입 시 네디플에서 사용하는 이름, 이메일주소, 휴대폰번호, 닉네임</span>을 수집합니다.</span>
            <span className='font-[350] text-[14px]'><span className='font-[500]'>계정 로그인 정보: 사용자의 간편 로그인 정보</span>가  포함됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px]'>주문 정보</h2>
            <span className='font-[350] text-[14px]'><span className='font-[500]'>구매 세부정보:</span> 귀하가 구매할 때 당사는 <span className='font-[500]'>귀하가 주문한 품목, 배송 주소, 결제 세부정보</span>에 대한 정보를 수집합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[16px]'>네일숍 예약 정보</h2>
            <span className='font-[350] text-[14px]'><span className='font-[500]'>예약내역 : 네일샵 예약 시 예약하신 네일샵, 예약시간, 예약금 입금, 추가 예약내역</span> 등의 정보를 수집합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0 mb-[40px]'>
            <h2 className='font-[500] text-[16px]'>사용 데이터</h2>
            <span className='font-[350] text-[14px]'><span className='font-[500]'>플랫폼 상호 작용:</span> 당사는 <span className='font-[500]'>귀하가 당사 아카이브에 저장한 이미지와 디자인 생성 기능에 대한 사용 데이터를 포함하여 귀하가 당사 기능을 사용하는 방법에 대한 정보</span>를 수집합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0 mb-[40px]'>
            <h2 className='font-[500] text-[18px]'>회원가입조건</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>네디플에 계정을 등록하려면 다음 조건을 충족해야 합니다.</span>
            <span className='font-[500] text-[14px]'>연령 요건: 계정을 만들려면 14세 이상이어야 합니다. 귀하가 18세 미만인 경우 결제와 관련된 모든 거래 또는 기능에 부모의 동의가 필요합니다.</span>
            <span className='font-[500] text-[14px]'>정확한 정보: 귀하는 등록 과정에서 정확하고 최신의 완전한 정보를 제공하고 이를 최신 상태로 유지하는 데 동의합니다.</span>
            <span className='font-[500] text-[14px]'>고유 계정: 계정은 하나만 만들 수 있습니다. 여러 계정이 정지되거나 해지될 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0 mb-[40px]'>
            <h2 className='font-[500] text-[18px]'>당사가 귀하의 정보를 사용하는 방법</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>당사는 다음과 같은 몇 가지 중요한 이유로 귀하의 정보를 사용합니다.</span>
            <span className='font-[500] text-[14px] '>귀하의 경험을 향상시키기 위해: 귀하가 플랫폼을 사용하는 방식을 이해하면 플랫폼을 개선하는 데 도움이 됩니다.</span>
            <span className='font-[500] text-[14px] '>서비스 제공을 위해: 이미지 검색, 아카이브 검색, 제품 구매, 네일샵 예약을 원활하게 하기 위해 귀하의 정보가 필요합니다.</span>
            <span className='font-[500] text-[14px] '>구매를 처리하기 위해: 당사는 주문을 처리하고 제품을 배송하기 위해 귀하의 정보를 사용합니다.</span>
            <span className='font-[500] text-[14px] '>네일샵 예약 관리: 당사는 예약, 취소, 결제, 환불을 위해 귀하의 예약 정보를 활용합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0 mb-[40px]'>
            <h2 className='font-[500] text-[18px]'>귀하의 정보 공유</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>우리는 귀하의 개인 정보를 소중히 여기며 다음과 같은 경우를 제외하고는 귀하의 개인 정보를 다른 사람과 공유하지 않습니다.</span>
            <span className='font-[350] text-[14px] '><span className='font-[500]'>귀하의 동의 하에:</span> 당사는 개인 정보를 공유하기 전에 귀하의 동의를 구할 것입니다.</span>
            <span className='font-[350] text-[14px] '><span className='font-[500]'>서비스 제공업체에:</span> 당사는 서비스(예: 제품 구매 및 배송) 제공에 도움을 주는 신뢰할 수 있는 회사와 정보를 공유할 수 있습니다. 귀하의 정보를 안전하게 유지하기 위해 필요합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0 mb-[40px]'>
            <h2 className='font-[500] text-[18px]'>귀하의 권리</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>귀하는 귀하의 개인정보에 관해 다음과 같은 권리를 갖습니다.</span>
            <span className='font-[350] text-[14px] '><span className='font-[500]'>액세스 및 업데이트:</span> 계정 설정에서 언제든지 정보를 확인하고 업데이트할 수 있습니다.</span>
            <span className='font-[350] text-[14px] '><span className='font-[500]'>계정 삭제:</span> 네디플을 더 이상 사용하지 않기로 결정한 경우 계정 및 모든 관련 데이터를 삭제할 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[18px]'>귀하의 정보를 보호하는 방법</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>귀하의 정보를 안전하게 유지하는 것은 우리에게 매우 중요합니다! 당사는 무단 접근으로부터 귀하의 데이터를 보호하기 위해 다양한 보안 조치를 사용합니다. 그러나 100% 안전한 온라인 플랫폼은 없으므로 강력한 비밀번호를 사용하고 로그인 정보를 비공개로 유지하는 것이 좋습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[500] text-[18px]'>본 정책의 변경 사항</h2>
            <span className='font-[350] text-[14px] mb-[20px]'>때로는 변경 사항을 따라잡기 위해 이 개인 정보 보호 정책을 업데이트해야 할 수도 있습니다. 그럴 경우 웹사이트 내 알림센터 또는 팝업창을 활용한 공지나 이메일을 통해 알려드리겠습니다. 이 정책을 수시로 확인하는 것이 좋습니다!</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col gap-[5px] flex-shrink-0'>
            <h2 className='font-[500] text-[18px]'>문의하기</h2>
            <span className='font-[350] text-[14px] '>개인 정보 보호 정책에 대해 궁금한 점이 있으면 네디플의 고객센터 및 QnA 페이지를 통해 언제든지 문의하세요. 우리가 도와드리겠습니다!</span>
            <span className='font-[350] text-[14px] '>(이메일 문의: assistant@naildp.com)</span>
            <span className='font-[350] text-[14px] '>네디플을 이용해 주셔서 감사합니다! 여러분의 네일 아트 디자인 아이디어를 탐색하고 공유해 보세요!</span>
          </div>
        </div>
      </div>
    </div>
  )
}