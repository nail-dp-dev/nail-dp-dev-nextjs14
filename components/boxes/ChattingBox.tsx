'use client'

import { ChattingBoxProps } from '../../constants/interface'
import SearchIcon from '../../public/assets/svg/small-search.svg'
import CloseChatMaxIcon from '../../public/assets/svg/close_chat_max.svg'
import CloseChatIcon from '../../public/assets/svg/close_chat.svg'
import Image from 'next/image'


export default function ChattingBox({ isChatModalShow, handleCloseChatModal }: ChattingBoxProps) {
  return (
    <div className={`chattingComponent ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal w-[360px] h-[600px] flex flex-col items-center justify-start transition-opacity rounded-[20px] border-[2px] border-purple bg-white duration-500 overflow-hidden`} >
      <div className='topBar w-full h-[40px] flex items-center justify-between border-b border-darkGray px-[12px]'>
          <form className='w-[160px] h-[25px] flex items-center justify-start rounded-[20px] border-purple border-[1px] pl-[5px] gap-[5px]'>
            <label htmlFor="searchBar"><SearchIcon /></label>
            <input type="text" id='searchBar' className='searchBar w-[80%] border-none outline-none bg-transparent text-[11px]' placeholder='채팅방, 참여자 통합검색'/>
          </form>
          <div className='buttonBox w-[50px] h-full flex items-center gap-[10px] justify-end'>
            <button 
              className=''
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
      <nav className='navBar w-full h-[50px] flex items-center justify-center gap-[10px]'>
        <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>전체</span></button>
        <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>친구</span></button>
        <button className='w-[100px] h-[30px] flex items-center justify-center bg-purple text-white rounded-[20px]'><span>네일숍</span></button>
      </nav>
      <div className='chatRowBox w-full flex-1 flex flex-col items-center justify-start overflow-hidden overflow-y-scroll'>
        <ul className='w-full h-full'>
          {
            [2, 2, 2, 2, 2, 2,2,2,2,2].map((chat, index) => (
              <li key={index} className='w-[325px] h-[62px] flex items-center justify-between rounded-[20px] mx-auto mb-[10px] hover:bg-chatChooseButton p-[10px]'>
                <div className='chatRoomImage w-[40px] h-[40px] mr-[10px]'>
                  <Image src={`https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg`} width={40} height={40} alt={'chatRoomImage'} style={{objectFit: 'cover', width: '100%', height: '100%'}} quality={100} sizes='100vw' priority className='rounded-full ' />  
                </div>
                <div className='flex-1 h-[50px] flex justify-between'>
                  <div></div>
                  <div></div>
                </div>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
