'use client'

interface NoticeProps {
  pageName: string;
}

export default function Notice({pageName}:NoticeProps) {


  return (
    <div className='w-full h-full flex items-center justify-center '>
      <div className='flex flex-col items-center justify-between gap-[20px]'>
        <p>제작중인 <span className='font-[700]'>{`'${pageName}'`}</span>  페이지 입니다</p>
        <p>12월 중</p>
        <p>서비스 런칭 계획중 입니다</p>
        <p>♥️ 많은 관심 부탁드립니다 ♥️</p>
        {
          pageName === '디자인 제작' &&
          <button className='w-[200px] h-[50px] button-color button-layout button-tr hover:button-hover'>사전예약하기</button>
        }
      </div>
    </div>
  )
}