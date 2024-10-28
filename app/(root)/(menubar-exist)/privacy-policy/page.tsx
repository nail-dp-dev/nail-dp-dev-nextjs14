export default function PrivacyPage(){
  return(
    <div className='w-full h-full flex flex-col'>
      <div className='w-full h-full flex flex-col transition-all'>
        <div className='w-full h-[40px] flex items-center'>
          <span className='text-[14px] font-[700]'>네디플 개인정보 보호정책</span>
        </div>
        <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[10px] bg-kakaoYellow'>
          <div className='userBoxDiv w-full h-[50px] flex-shrink-0 flex items-center justify-between hover:bg-lightPurple rounded-[20px] pl-[5px] pr-[15px] bg-red'>

          </div>
        </div>
      </div>
    </div>
  )
} 