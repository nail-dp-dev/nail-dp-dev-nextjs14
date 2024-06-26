'use client'

import { ChattingBoxProps } from '../../constants/interface'
import SearchIcon from '../../public/assets/svg/search.svg'
import CloseChatMaxIcon from '../../public/assets/svg/close_chat_max.svg'
import CloseChatIcon from '../../public/assets/svg/close_chat.svg'


export default function ChattingBox({ isChatModalShow, handleCloseChatModal }: ChattingBoxProps) {
  return (
    <div className={`chattingComponent ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal w-[360px] h-[600px] flex flex-col items-center justify-between transition-opacity rounded-[20px] border-[2px] border-purple bg-white duration-500`} >
      <div className='topBar w-full h-[44px] px-[10px] flex items-center justify-between border-b border-darkGray'>
        <form className='w-[200px] h-[35px] flex items-center justify-start shadow-black shadow-chat-form-shadow rounded-[20px] pl-[5px] gap-[5px]'>
          <label htmlFor="searchBar"><SearchIcon /></label>
          <input type="text" id='searchBar' className='searchBar w-[80%] h-full border-none outline-none bg-transparent' placeholder='채팅방, 참여자 통합검색'/>
        </form>
        <div className='buttonBox flex-1 h-full  flex items-center gap-[10px] justify-end'>
        <button 
          className=' '
            onClick={(e) => handleCloseChatModal(e)}>
            <CloseChatMaxIcon/>
        </button>
        <button 
          className='  '
            onClick={(e) => handleCloseChatModal(e)}>
            <CloseChatIcon/>
        </button>
        </div>
      </div>
      <div className='chatsBox flex-1 flex flex-col'>
        <nav className='w-full h-[46px] flex items-center justify-center gap-[10px]'>
          <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>전체</span></button>
          <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>친구</span></button>
          <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>네일숍</span></button>
        </nav>
        <div className='chatRowBox flex-1 flex flex-col items-center justify-start gap-[20px] bg-red overflow-hidden snap-y snap-mandatory'>
          {
            [2, 2, 2, 2, 2, 2,2,2,2,2].map((chat, index) => (
              <div key={index} className='w-full h-[70px] snap-start bg-kakaoYellow'>
                asdfij
              </div>
          ))}
        </div>
      </div>
    </div>
  )
}
