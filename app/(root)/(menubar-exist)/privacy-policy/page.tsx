import NdpIcon from '../../../../public/assets/svg/nail-logo-small.svg'

export default function PrivacyPage() {

  return(
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          <NdpIcon />
          <span className='text-[24px] font-[700] text-textDarkPurple'>네디플 개인정보 보호정책</span>
        </div>
        <div className='w-full min-h-[100px] flex items-center justify-center rounded-[20px] gap-[10px] bg-lightPurple'>
          <span className='text-[16px] font-[350] text-textDarkPurple text-center'>네디플에 오신 것을 환영합니다! 우리는 귀하의 개인 정보를 중요하게 생각하며 귀하가 플랫폼을 사용하는 동안 안전함을 느끼기를 바랍니다. 이 정책은 당사가 귀하의 개인정보를 수집, 사용 및 보호하는 방법을 설명합니다.</span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[10px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '>
            <p className='font-[500] text-[18px]'>당사가 수집하는 정보</p>
            <span className='font-[350] text-[14px]'>귀하가 네디플을 사용할 때 당사는 일부 개인정보를 요청할 수 있습니다. 여기에는 다음이 포함될 수 있습니다.</span>
          </div>
          <div className='userBoxDiv w-full min-h-[50px] flex flex-col flex-shrink-0 '>
            <div>
              <span className='font-[500]'>계정 세부정보:</span> 가입 시 수집되는 이름, 이메일 주소, 휴대폰 번호, 네디플에서 사용하는 닉네임, 간편 로그인 계정 정보가 수집됩니다.
            </div>
            <div>
              <span className='font-[500]'>주문 정보:</span> 구매를 하면 주문한 상품, 배송 주소 및 결제 세부정보가 수집됩니다.
            </div>
            <div>
              <span className='font-[500]'>네일숍 예약 정보:</span> 네일숍 예약을 하면 예약한 네일숍, 예약시간, 예약금 결제 및 예약 상세 내역 등의 세부정보가 수집됩니다.
            </div>
            <div>
              <span className='font-[500]'>사용 데이터:</span> 또한 귀하가 아카이브에 저장하는 이미지, 디자인 제작 기능 사용 데이터 등 귀하가 당사 기능을 어떻게 사용하는지에 대한 정보도 수집합니다.
            </div>
          </div>  
               
          

          <div className='userBoxDiv w-full min-h-[20px] flex-shrink-0'>     
            <p className='font-[500] text-[18px]'>당사가 귀하의 정보를 사용하는 방법</p>
            <span>당사는 다음과 같은 몇 가지 중요한 이유로 귀하의 정보를 사용합니다.</span>
          </div>
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0'>     
            <div>
              <span className='font-[500]'>귀하의 경험을 향상시키기 위해:</span> 우리는 네디플에서의 사용경험을 최대한 즐겁게 만들고 싶습니다! 귀하가 우리 플랫폼을 어떻게 사용하는지 이해함으로써 우리는 플랫폼을 더 좋게 만들 수 있습니다.
            </div>
            <div>
              <span className='font-[500]'>서비스 제공을 위해:</span> 이미지 검색, 아카이브 탐색, 내아카이브 저장관리, 제품구매, 네일숍 예약 등 이러한 기능을 원활하게 사용하려면 귀하의 정보가 필요합니다.
            </div>
            <div>
              <span className='font-[500]'>구매 처리를 위해:</span> 귀하가 네디플에서 네일 아트 재료 등의 제품을 구매하는 경우, 당사는 귀하의 주문을 처리하고 제품 배송 또는 중간 관리자 역할을 위해 귀하의 정보를 사용합니다.
            </div>
            <div>
              <span className='font-[500]'>네일숍 예약 관리를 위해:</span> 귀하가 네디플의 ‘네일숍 예약‘ 기능을 통해 네일숍을 예약하거나 취소 또는 결제 및 환불이 필요할 경우, 귀하의 예약 정보를 사용합니다.
            </div>
          </div>
               
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '>    
            <p className='font-[500] text-[18px]'>귀하의 정보 공유</p>
            <span>우리는 귀하의 개인 정보를 소중히 여기며 다음과 같은 경우를 제외하고는 귀하의 개인 정보를 다른 사람과 공유하지 않습니다.</span>
          </div>

          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0'>
            <div>
              <span className='font-[500]'>귀하의 동의 하에:</span> 당사는 개인 정보를 공유하기 전에 귀하의 동의를 구할 것입니다.
            </div>
            <div>
              <span className='font-[500]'>서비스 제공업체에:</span> 당사는 서비스(예: 제품 구매 및 배송) 제공에 도움을 주는 신뢰할 수 있는 회사와 정보를 공유할 수 있습니다. 귀하의 정보를 안전하게 유지하기 위해 필요합니다.
            </div>
          </div>  
               
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0'>
            <p className='font-[500] text-[18px]'>귀하의 권리</p>
            귀하는 귀하의 개인정보에 관해 다음과 같은 권리를 갖습니다.
          </div>
          
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '> 
            <div>
              <span className='font-[500]'>액세스 및 업데이트:</span> 계정 설정에서 언제든지 정보를 확인하고 업데이트할 수 있습니다.
            </div>
            <div>
              <span className='font-[500]'>계정 삭제:</span> 네디플을 더 이상 사용하지 않기로 결정한 경우 계정 및 모든 관련 데이터를 삭제할 수 있습니다.
            </div>
          </div>     
               
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '>
            <p className='font-[500] text-[18px]'>귀하의 정보를 보호하는 방법</p>
            귀하의 정보를 안전하게 유지하는 것은 우리에게 매우 중요합니다! 당사는 무단 접근으로부터 귀하의 데이터를 보호하기 위해 다양한 보안 조치를 사용합니다. 그러나 100% 안전한 온라인 플랫폼은 없으므로 강력한 비밀번호를 사용하고 로그인 정보를 비공개로 유지하는 것이 좋습니다.
          </div>
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '>
            <p className='font-[500] text-[18px]'>본 정책의 변경 사항</p>
            때로는 변경 사항을 따라잡기 위해 이 개인 정보 보호 정책을 업데이트해야 할 수도 있습니다. 그럴 경우 웹사이트 내 알림센터 또는 팝업창을 활용한 공지나 이메일을 통해 알려드리겠습니다. 이 정책을 수시로 확인하는 것이 좋습니다!
          </div>
          <div className='userBoxDiv w-full min-h-[50px] flex-shrink-0 '>
            <p className='font-[500] text-[18px]'>문의하기</p>
            <p>개인 정보 보호 정책에 대해 궁금한 점이 있으면 네디플의 고객센터 및 QnA 페이지를 통해 언제든지 문의하세요. 우리가 도와드리겠습니다!</p>
            <p>(이메일 문의: assistant@naildp.com)</p>
            <p>네디플을 이용해 주셔서 감사합니다! 여러분의 네일 아트 디자인 아이디어를 탐색하고 공유해 보세요!</p>
          </div>
        </div>
      </div>
    </div>
  )
} 