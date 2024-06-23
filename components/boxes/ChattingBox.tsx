'use client'

import { ChattingBoxProps } from '../../constants/interface'


export default function ChattingBox({ isChatModalShow, handleCloseChatModal }: ChattingBoxProps) {
  return (
    <div className={`chattingComponent ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal w-[360px] h-[600px] transition-opacity rounded-[20px] border-[2px] border-purple bg-white duration-500`} >
      <button onClick={(e) => handleCloseChatModal(e)}>닫기</button>
    </div>
  )
}
