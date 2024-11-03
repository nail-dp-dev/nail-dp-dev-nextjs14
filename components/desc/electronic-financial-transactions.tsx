import NdpIcon from '../../public/assets/svg/nail-logo-small.svg'

export default function ElectronicFinancialTransactionsComponent({ isSmall }: { isSmall: boolean }) {
  
  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          {!isSmall && <NdpIcon />}
          <span className={`${isSmall ? 'text-[16px]' : 'text-[24px]'} font-[700] text-textDarkPurple`}>네디플 전자금융거래 동의안내</span>
        </div>
        <div className='w-full min-h-[40px] rounded-[20px] gap-[10px] bg-lightPurple flex flex-col items-start justify-center text-start p-[20px]'>
          <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>전자금융거래 동의</span>
          <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[350]`}>네디플의 결제 서비스를 이용함으로써 귀하는 다음 사항에 동의하게 됩니다.</span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[30px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>전자거래에 대한 동의</h2>
            <span className='font-[350] text-[14px]'>귀하는 가상 화폐인 {`"비츠(Bits)"`} 사용, 네일샵 예약 및 서비스 결제 등을 포함하여 당사 플랫폼을 통해 전자적으로 금융 거래를 수행하는 데 동의합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>결제수단 등록</h3>
            <span className='font-[350] text-[14px]'>당사 서비스의 특정 기능에 액세스하려면 계정을 만들어야 할 수도 있습니다. 귀하는 등록 과정에서 정확하고 최신의 완전한 정보를 제공하고 해당 정보를 정확하고 최신의 완전한 상태로 유지하기 위해 업데이트하는 데 동의합니다. 귀하는 비밀번호를 포함한 귀하의 계정 정보와 귀하의 계정에서 발생하는 모든 활동에 대한 기밀을 유지할 책임이 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>결제정보 수집</h3>
            <span className='font-[350] text-[14px]'>당사는 귀하의 거래를 원활하게 하기 위해 귀하의 신용카드 정보, 청구서 수신 주소 등의 결제 정보를 수집할 수 있습니다. 당사는 개인정보 보호 정책에 따라 이 정보를 처리합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>전자 기록에 대한 접근</h3>
            <span className='font-[350] text-[14px]'>귀하는 거래에 대한 전자 확인 및 기록을 받게 됩니다. 이는 등록 시 제공한 이메일 주소로 전송됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>장치 요구사항</h3>
            <span className='font-[350] text-[14px]'>당사 서비스를 이용하려면 인터넷 접속이 가능한 장치와 유효한 이메일 주소가 필요합니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>동의 철회 권리</h3>
            <span className='font-[350] text-[14px]'>귀하는 네디플 고객센터로 당사에 연락하여 언제든지 전자 거래에 대한 동의를 철회할 수 있습니다. 이는 특정 기능을 사용하는 능력에 영향을 미칠 수 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>정보 업데이트</h3>
            <span className='font-[350] text-[14px]'>원활한 거래를 위해 연락처 및 결제 정보를 최신 상태로 유지하시기 바랍니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h3 className='font-[700] text-[14px]'>보안 공지</h3>
            <span className='font-[350] text-[14px]'>당사는 귀하의 정보를 보호하기 위해 보안 조치를 시행하지만 전자 전송 방법이 완전히 안전할 수는 없습니다. 개인 및 결제 세부정보를 제공할 때는 주의하세요.</span>
          </div>
        </div>
      </div>
    </div>
  )
}