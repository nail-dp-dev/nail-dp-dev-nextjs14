import NdpIcon from '../../public/assets/svg/nail-logo-small.svg'

export default function TermsOfServiceComponent({ isSmall }: { isSmall: boolean }) {

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all gap-[24px]'>
        <div className='w-full h-[70px] flex items-center justify-start gap-[10px] border-b-[1px] border-darkGray'>
          {!isSmall && <NdpIcon />}
          <span className={`${isSmall ? 'text-[16px]' : 'text-[24px]'} font-[700] text-textDarkPurple`}>네디플 이용약관</span>
        </div>
        <div className='w-full min-h-[100px] rounded-[20px] gap-[10px] bg-lightPurple flex items-center justify-center text-start p-[20px]'>
          <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[350] text-textDarkPurple`}>
            <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>네디플</span>(“서비스”, “웹사이트” 또는 “우리의”)에 오신 것을 환영합니다. 본 <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>이용 약관</span>은 당사 서비스, 웹 사이트 및 당사가 제공하는 모든 콘텐츠, 기능 또는 애플리케이션(통칭하여 {`"서비스"`})에 대한 귀하의 액세스 및 사용에 적용됩니다. 당사 서비스에 액세스하거나 이를 사용함으로써 귀하는 <span className={`${isSmall ? 'text-[12px]' : 'text-[16px]'} font-[700]`}>본 약관을 준수하는 데 동의</span>하게 됩니다. 본 약관에 동의하지 않는 경우 당사 서비스를 이용하지 마십시오.
          </span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[30px] px-[10px] pt-[20px] pb-[50px]'>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>자격</h2>
            <span className='font-[350] text-[14px]'>당사 서비스를 이용하려면 [연령 요건, 예: 14세 또는 18세] 이상이어야 합니다. 당사 서비스를 이용함으로써 귀하는 이러한 자격 요건을 충족함을 나타냅니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>계정 등록</h2>
            <span className='font-[350] text-[14px]'>당사 서비스의 특정 기능에 액세스하려면 계정을 만들어야 할 수도 있습니다. 귀하는 등록 과정에서 정확하고 최신의 완전한 정보를 제공하고 해당 정보를 정확하고 최신의 완전한 상태로 유지하기 위해 업데이트하는 데 동의합니다. 귀하는 비밀번호를 포함한 귀하의 계정 정보와 귀하의 계정에서 발생하는 모든 활동에 대한 기밀을 유지할 책임이 있습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>사용자 행동</h2>
            <span className='font-[350] text-[14px]'>귀하는 본 약관에 따라 합법적인 목적으로만 당사 서비스를 사용하는 데 동의합니다. 귀하는 다음과 같은 행위를 하지 않을 것에 동의합니다.</span>
            <span className='font-[350] text-[14px]'>-해당 연방, 주, 지방 또는 국제 법률이나 규정을 위반하는 방식으로 서비스를 사용하는 행위.</span>
            <span className='font-[350] text-[14px]'>-다른 사람의 서비스 사용 또는 향유를 제한하거나 방해하는 행위에 가담하는 행위.</span>
            <span className='font-[350] text-[14px]'>-네디플, 네디플 직원, 다른 사용자, 기타 개인이나 단체를 사칭하거나 사칭하려고 시도하는 행위.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>지적재산권</h2>
            <span className='font-[350] text-[14px]'>텍스트, 그래픽, 로고 및 소프트웨어를 포함하되 이에 국한되지 않는 당사 서비스의 모든 콘텐츠, 특징 및 기능은 네디플 또는 해당 라이센스 제공자의 독점 재산이며 저작권, 상표, 특허 및 기타 지적 재산권법에 의해 보호됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>보증 면책조항</h2>
            <span className='font-[350] text-[14px]'>당사의 서비스는 명시적이든 묵시적이든 어떠한 종류의 보증도 없이 {`"있는 그대로"`} 및 {`"이용 가능한 대로" `}제공됩니다. 당사는 서비스가 중단되지 않거나 오류가 없다는 점, 결함이 수정될 것이라는 점, 서비스에 바이러스나 기타 유해한 구성 요소가 없다는 점을 보증하지 않습니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>책임의 제한</h2>
            <span className='font-[350] text-[14px]'>법률이 허용하는 최대 한도 내에서, 네디플은 귀하의 당사 서비스 사용으로 인해 발생하거나 이와 관련하여 발생하는 모든 간접적, 부수적, 특수적, 결과적 또는 징벌적 손해에 대해 책임을 지지 않습니다. 이는 그러한 손해의 가능성에 대해 통보를 받은 경우에도 마찬가지입니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>면책</h2>
            <span className='font-[350] text-[14px]'>귀하는 당사 서비스 사용으로 인해 또는 이와 관련하여 발생하는 합리적인 변호사 비용을 포함하여 모든 청구, 책임, 손해, 손실 또는 비용으로부터 네디플 및 그 계열사, 라이센스 제공자 및 서비스 제공자를 면책하고 피해를 주지 않는 데 동의합니다. 본 약관을 위반하거나 다른 당사자의 권리를 침해하는 행위.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>약관 변경</h2>
            <span className='font-[350] text-[14px]'>당사는 수시로 본 약관을 개정할 수 있습니다. 당사는 당사 웹사이트에 새로운 약관을 게시하여 변경 사항을 귀하에게 통보할 것입니다. 변경 후에도 서비스를 계속 사용하면 새 약관에 동의하는 것으로 간주됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>준거법</h2>
            <span className='font-[350] text-[14px]'>본 약관은 국제사법 원칙에 관계없이 대한민국 법률에 따라 규율되고 해석됩니다.</span>
          </div>
          <div className='spanDiv w-full min-h-[50px] flex flex-col flex-shrink-0'>
            <h2 className='font-[700] text-[18px]'>연락처 정보</h2>
            <span className='font-[350] text-[14px]'>본 약관에 대해 질문이나 우려 사항이 있는 경우 네디플 고객센터 또는 assistant@naildp.com으로 문의하시기 바랍니다.</span>
          </div>
        </div>
      </div>
    </div>
  )
}