'use client'

interface NoticeProps {
  pageName: string;
}

export default function Notice({pageName}:NoticeProps) {


  return (
    <div className='w-full h-full flex items-center justify-center '>
      <div className='flex flex-col items-center justify-between gap-[20px]'>
        <p>제작중인 <span className='font-[700]'>{`'${pageName}'`}</span>  페이지 입니다</p>
        <p>10월 중</p>
        <p>서비스 런칭 계획중 입니다</p>
        <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
      </div>
    </div>
  )
}