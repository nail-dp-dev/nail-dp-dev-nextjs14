'use client'

import { ChattingBoxProps } from '../../constants/interface'
import SearchIcon from '../../public/assets/svg/small-search.svg'
import ChatMaxIcon from '../../public/assets/svg/close_chat_max.svg'
import CloseChatIcon from '../../public/assets/svg/close_chat.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChatCategoryElements } from '../../constants'
import { getAllChatList } from '../../api/chat/getAllChatList'
import ChatComponent from '../modal/message/MessageRoom'
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setActivateChatRoomId, setChatRoomOpen } from '../../store/slices/messageSlice'
import ShopIcon from '../../public/assets/svg/shop-icon.svg'
import SockJS from 'sockjs-client'
import { Client, Message } from '@stomp/stompjs'
import useLoggedInUserData from '../../hooks/user/useLoggedInUserData'


interface Chat {
  roomName: string;
  roomId: string;
  unreadCount: number;
  profileUrls: [string];
  lastMessage: string;
  participantCnt: number;
  modifiedAt: any;
  isBusiness: boolean;
}

export default function ChattingBox({ isChatModalShow, isChatModalMax, setIsChatModalMax, handleCloseChatModal }: ChattingBoxProps) {

  const [isChatListNull, setIsChatListNull] = useState<boolean>(false);
  const [category, setCategory] = useState('all')
  const [chatList, setChatList] = useState<Chat[]>([])
  const [isChatArrived, setIsChatArrived] = useState<boolean>(false);
  const [chatRoomClicked, setChatRoomClicked] = useState<boolean>(false);
  const isChatRoomOpened = useSelector((state: RootState) => state.message.isChatRoomOpened);
  const activateChatRoomId = useSelector((state: RootState) => state.message.activateChatRoomId);
  const chatModalMaxWidth = window.innerWidth - 375
  const chatModalMaxHeight = window.innerHeight - 120
  const dispatch = useDispatch();
  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname;
  const clientRef = useRef<Client | null>(null);

  const clickChatRoom = (e: any, chatRoomId:string) => {
    e.stopPropagation()
    e.preventDefault()
    setChatRoomClicked(prev=>!prev)
    dispatch(setChatRoomOpen(true));
    dispatch(setActivateChatRoomId(chatRoomId));
  }
  
  const clickCategory = (e: any, data:string) => {
    e.stopPropagation()
    setCategory(data)
  }

  const clickChatMaxIcon = (e: any) => {
    e.stopPropagation()
    setIsChatModalMax(true)
  }

  const clickCloseChatRoom = (e: any) => {
    e.stopPropagation()
    dispatch(setChatRoomOpen(false));
    dispatch(setActivateChatRoomId(''));
  }

  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const result = await getAllChatList();
        setChatList(result.data.contents)
        if (result.data.contents.length === 0) {
          setIsChatListNull(true)
        }
      } catch (error) {
        console.error('Failed to fetch shared count:', error);
      }
    }

    fetchChatList()

  }, [category, isChatArrived, activateChatRoomId])
  
    useEffect(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }

    const socket = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });


    stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');

      if(userNickName) {
        stompClient.subscribe(`/sub/chat/list/updates/${userNickName.toString()}`, (list: Message) => {
          const getlist: any = JSON.parse(list.body);
          setIsChatArrived(prev=>!prev);
          console.log(getlist)
        });
      }
    };

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, []);

  return (
    <div 
      className={`chattingComponent relative ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal flex flex-col items-center justify-center transition-all rounded-[20px] border-[2px] border-purple bg-white duration-500 overflow-hidden`} 
      style={{
        width: isChatModalMax ? chatModalMaxWidth : '360px',
        height: isChatModalMax ? chatModalMaxHeight : '600px'
      }}
    >
      
      <div className='topBar w-full h-[40px] z-40 flex items-center justify-between bg-white  border-b border-darkGray px-[12px] '>

        <form className='serchBarForm w-[160px] h-[25px] flex items-center justify-start rounded-[20px] border-purple border-[1px] pl-[5px] gap-[5px]'>
          <label htmlFor="searchBar"><SearchIcon /></label>
          <input type="text" id='searchBar' className='searchBar w-[80%] border-none outline-none bg-transparent text-[11px]' placeholder='채팅방, 참여자 통합검색'/>
        </form>

        <div className='reactButtonBox w-[50px] h-full flex items-center gap-[10px] justify-end'>

          {
            !isChatModalMax &&
            <button 
              className=''
                onClick={(e) => clickChatMaxIcon(e)}>
                <ChatMaxIcon/>
            </button>
          }
          <button 
            className='  '
              onClick={(e) => handleCloseChatModal(e)}>
              <CloseChatIcon/>
          </button>
        </div>
      </div>

      <div className='contentBox w-full flex-1 flex items-center justify-start overflow-hidden'>
        <div className={`leftContentBox w-[360px] h-full flex flex-col ${!isChatModalMax && 'w-full'}`}>
          <nav className={`categoryBar ${!isChatModalMax && isChatRoomOpened && 'hidden'} w-full h-[50px] flex items-center justify-center gap-[10px]`}>
            {
              ChatCategoryElements.map((item, index) => (
                <button
                  key={index}
                  className={`w-[100px] h-[30px] flex items-center justify-center ${category === item.data && 'bg-purple text-white'} hover:bg-purple hover:text-white bg-buttonLightGray text-darkPurple font-[700] rounded-[20px]`}
                  //네일숍 런칭 하기 전까지는 disabled 하는걸로.
                  disabled={item.data === 'shop'}
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
                isChatRoomOpened && !isChatModalMax &&
                <li className='w-full h-[62px]'></li>
              }
              {
                !isChatListNull && 
                chatList.map((chat, index) => (
                <li 
                  key={index} 
                  className={`${isChatRoomOpened && !isChatModalMax && 'w-full'} ${isChatRoomOpened && activateChatRoomId  === chat.roomId && !isChatModalMax && 'hidden'} w-[325px] h-[62px] rounded-[20px] mx-auto mb-[10px] hover:bg-chatChooseButton transition-all overflow-hidden ${activateChatRoomId === chat.roomId && 'bg-lightPurple'} `}
                >
                  <button
                    className={`w-full h-full flex items-center justify-between ${activateChatRoomId === chat.roomId && ''} p-[10px]`}
                    onClick={(e) => { clickChatRoom(e, chat.roomId) }}
                  >
                    <div className={`chatRoomImage bg-white rounded-full ${activateChatRoomId === chat.roomId && isChatRoomOpened ? 'w-[40px] h-[40px] z-40' : activateChatRoomId !== chat.roomId && isChatRoomOpened && !isChatModalMax ? 'w-[30px] h-[30px]' : 'w-[40px] h-[40px]'} mr-[10px]`}>
                      <Image 
                        src={chat.profileUrls[0]} 
                        width={40} height={40} alt={'chatRoomImage'} 
                        style={{objectFit: 'cover', width: '100%', height: '100%'}} 
                        quality={100} 
                        sizes='100vw' 
                        className='rounded-full' 
                      />  
                    </div>
                    <div className='flex-1 h-[50px] flex justify-between py-[5px]'>
                      <div className='flex-1 w-[200px] h-full flex flex-col items-start justify-center gap-[5px]'>
                        <div className='flex items-center gap-[5px]'>
                          <span className='font-[700] text-[14px] text-textDarkPurple'>{chat.roomName}</span>
                          {
                            chat.isBusiness &&
                            <ShopIcon/>
                          }
                        </div>
                        <div>
                          <span className='font-[400] text-[11px] text-left text-textDarkPurple overflow-hidden whitespace-nowrap text-ellipsis block w-[200px]'>
                            {chat.lastMessage}
                          </span>                        
                        </div>
                      </div>
                      <div className='min-w-[40px] h-full flex flex-col items-end justify-between '>
                        <span className='font-[400] text-[8px] text-dateGray'>{'10월 15일'}</span>
                        {
                          chat.unreadCount !== 0 &&
                          <div className='bg-red flex items-center justify-center rounded-full text-white font-[500] text-[11px] min-w-[17px] h-[17px] p-1'>{chat.unreadCount}</div>
                        }
                      </div>
                    </div>
                  </button>
                </li>
              ))}
              <li className='w-full h-[5px]'></li>
            </ul>
          </div>

          <div className={`chatRoomDiv ${!isChatRoomOpened && !isChatModalMax && 'hidden'} absolute bg-lightPurple right-0 z-30`}
            style={{
              pointerEvents: 'auto',
              width: isChatModalMax ? chatModalMaxWidth - 368 : '310px',
              height: isChatModalMax ? chatModalMaxHeight - 43 : '557px'
            }} 
          >
            {
              isChatRoomOpened &&
              <ChatComponent clickCloseChatRoom={clickCloseChatRoom} isChatModalMax={isChatModalMax} />
            }
            {
              !isChatRoomOpened && isChatModalMax &&
              <div className='w-full h-full bg-lightPurple flex flex-col items-center pt-[52px]'>
                <div className='w-[200px] h-[35px] flex items-center justify-center rounded-[1000px] bg-white border-[1px] border-mainPurple'>
                  <span className='font-[700] text-[1rem] text-textDarkPurple'>대화할 방을 선택하세요.</span>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
