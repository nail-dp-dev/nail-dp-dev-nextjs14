import NdpIcon from '../../../../public/assets/svg/middle-logo.svg'

export default function TopBar() {
  return (
    <div className='w-full h-[65px]'>
      <div className='flex h-full items-center justify-start pl-[14px]'>
        <NdpIcon width='35' height='38' viewBox='0 0 35 38' className='mr-[10px]' />
        <span className='font-[700] text-[0.875rem] text-purple'>
          네디플 회원가입
        </span>
      </div>
    </div>
  )
}