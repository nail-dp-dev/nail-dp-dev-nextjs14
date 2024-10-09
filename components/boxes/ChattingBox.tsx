'use client'

import { ChattingBoxProps } from '../../constants/interface'
import SearchIcon from '../../public/assets/svg/small-search.svg'
import ChatMaxIcon from '../../public/assets/svg/close_chat_max.svg'
import CloseChatIcon from '../../public/assets/svg/close_chat.svg'
import Image from 'next/image'
import { useState } from 'react'
import { ChatCategoryElements } from '../../constants'


export default function ChattingBox({ isChatModalShow, isChatModalMax, setIsChatModalMax, handleCloseChatModal }: ChattingBoxProps) {

  const [isChatRoomOpen, setIsChatRoomOpen] = useState<boolean>(false)
  const [category, setCategory] = useState('all')
  const chatModalWidth = window.innerWidth - 350
  const chatModalHeight = window.innerHeight - 100

  const clickChatRoom = (e: any) => {
    e.stopPropagation()
    setIsChatRoomOpen(true)
    console.log(e)
  }
  
  const clickCategory = (e: any, data:string) => {
    e.stopPropagation()
    setCategory(data)
  }

  const clickChatMaxIcon = (e: any) => {
    setIsChatModalMax(true)
  }

  return (
    <div 
      className={`chattingComponent ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal flex flex-col items-center justify-start transition-opacity rounded-[20px] border-[2px] border-purple bg-white duration-500 overflow-hidden`} 
      style={{
        width: chatModalWidth,
        height: chatModalHeight
      }}
      >
      <div className='topBar w-full h-[40px] flex items-center justify-between border-b border-darkGray px-[12px]'>
          <form className='w-[160px] h-[25px] flex items-center justify-start rounded-[20px] border-purple border-[1px] pl-[5px] gap-[5px]'>
            <label htmlFor="searchBar"><SearchIcon /></label>
            <input type="text" id='searchBar' className='searchBar w-[80%] border-none outline-none bg-transparent text-[11px]' placeholder='채팅방, 참여자 통합검색'/>
          </form>
          <div className='buttonBox w-[50px] h-full flex items-center gap-[10px] justify-end'>
            <button 
              className=''
                onClick={(e) => clickChatMaxIcon(e)}>
                <ChatMaxIcon/>
            </button>
            <button 
              className='  '
                onClick={(e) => handleCloseChatModal(e)}>
                <CloseChatIcon/>
            </button>
      </div>
      </div>
      <nav className='navBar w-full h-[50px] flex items-center justify-center gap-[10px]'>
        {
          ChatCategoryElements.map((item, index) => (
            <button
              key={index}
              className={`w-[100px] h-[30px] flex items-center justify-center ${category === item.data && 'bg-purple text-white'} hover:bg-purple hover:text-white bg-buttonLightGray text-darkPurple font-[700] rounded-[20px]`}
              onClick={(e)=>{clickCategory(e,item.data)}}
            >
              <span>{item.name}</span>
            </button>
          ))
        }
      </nav>
      <div className='chatRowBox w-full flex-1 flex flex-col items-center justify-start overflow-hidden overflow-y-scroll '>
        <ul className='w-full h-full'>
          {
            [2, 2, 2, 2, 2, 2, 2, 2, 2, 2 ].map((chat, index) => (
              <li key={index} className={`${isChatRoomOpen && 'w-full z-40'} w-[325px] bg-red h-[62px] rounded-[20px] mx-auto mb-[10px] hover:bg-chatChooseButton p-[10px] transition-all`}>
                <button
                  className='w-full h-full flex items-center justify-between'
                  onClick={(e)=>{clickChatRoom(e)}}
                >
                  <div className='chatRoomImage w-[40px] h-[40px] mr-[10px]'>
                    <Image src={`https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg`} width={40} height={40} alt={'chatRoomImage'} style={{objectFit: 'cover', width: '100%', height: '100%'}} quality={100} sizes='100vw' className='rounded-full ' />  
                  </div>
                  <div className='flex-1 h-[50px] flex justify-between'>
                    <div></div>
                    <div></div>
                  </div>
                </button>
              </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
