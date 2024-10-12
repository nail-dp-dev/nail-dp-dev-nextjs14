import React, { useEffect, useState, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getChat } from '../../../api/chat/getChat';
import useLoggedInUserData from '../../../hooks/user/useLoggedInUserData';
import { ChatComponentProps } from '../../../constants/interface';
import CloseButtonIcon from '../../../public/assets/svg/close.svg'
import Image from 'next/image';
import ShopIcon from '../../../public/assets/svg/shop-icon.svg'
import UserActiveIcon from '../../../public/assets/svg/user-active-icon.svg'
import MessageRound from '../../../public/assets/svg/message-round.svg'
import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';

import MessageIconIcon from '../../../public/assets/svg/message-icon-icon.svg'
import MessagePhotoIcon from '../../../public/assets/svg/message-photo-icon.svg'
import MessageFolderIcon from '../../../public/assets/svg/message-folder-icon.svg'

interface ChatMessage {
  mention: string;
  content: [string];
  messageType: any;
  sender: string;
}

const ChatComponent = ({ clickCloseChatRoom, isChatModalMax } : ChatComponentProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const clientRef = useRef<Client | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isChatRoomOpened = useSelector((state: RootState) => state.message.isChatRoomOpened);
  const activateChatRoomId = useSelector((state: RootState) => state.message.activateChatRoomId);

  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname;
  
  const scrollToBottomAuto = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'auto'});
    }
  };
  const scrollToBottomSmooth = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth'});
    }
  };

  const clickIconButton = (e:any) => {
    e.stopPropagation()
    console.log('icon 버튼 클릭...')
  }

  const clickPhotoButton = (e:any) => {
    e.stopPropagation()
    console.log('Photo 버튼 클릭...')
  }

  const clickFolderButton = (e:any) => {
    e.stopPropagation()
    console.log('Folder 버튼 클릭...')
  }

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });

    const getBeforeChat = async (chatRoomId: string) => {
      const result = await getChat(chatRoomId);
      if (result) {
        setMessages(result.data.contents);
      }
    };

    getBeforeChat(activateChatRoomId);

    stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');

      stompClient.subscribe(`/sub/chat/${activateChatRoomId}`, (message: Message) => {
        const receivedMessage: ChatMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, receivedMessage]);
      });
    };

    stompClient.activate();
    clientRef.current = stompClient;

    return () => {
      if (clientRef.current) {
        clientRef.current.deactivate();
      }
    };
  }, [activateChatRoomId]);

  useEffect(() => {
    scrollToBottomAuto();
  }, [messages]);

  const sendMessage = () => {
    if (clientRef.current && inputMessage.trim()) {
      const messageDto = {
        content: [inputMessage],
        sender: userNickName,
        mention: [],
        messageType: 'TEXT',
      };

      clientRef.current.publish({
        destination: `/pub/chat/${activateChatRoomId}/message`,
        body: JSON.stringify(messageDto),
      });

      setInputMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault(); // 기본 Enter 동작 방지
    sendMessage(); // 메시지 전송
  }
};

  return (
    <div className='w-full h-full z-40 flex flex-col items-center justify-between border-l-[1px] border-t-[1px] border-mainPurple'>

      {
        !isChatRoomOpened &&
        <div className='w-full h-full bg-lightPurple flex flex-col items-center pt-[52px]'>
          <div className='w-[200px] h-[35px] flex items-center justify-center rounded-[1000px] bg-white border-[1px] border-mainPurple'>
            <span className='font-[700] text-[1rem] text-textDarkPurple'>대화할 방을 선택하세요.</span>
          </div>
        </div>
      }

      <div className={`${!isChatRoomOpened && 'hidden'} w-full z-40 flex items-center justify-between`}>
        <div className={`bg-lightPurple flex items-center px-[10px] rounded-l-[24px] z-20 flex-1 ${isChatModalMax ? 'h-[100px]' : 'h-[60px]'} top-0 ${!isChatModalMax && ' translate-y-[-1px] translate-x-[-50px] border-l-[1px]  border-t-[1px] border-mainPurple'}`}>
          {
            !isChatModalMax &&
            <MessageRound className='absolute translate-x-[19px] translate-y-[38px]'/>
          }
          <div className={`${isChatModalMax ? 'w-[62px] h-[62px]' : 'w-[42px] h-[42px]'} flex items-center justify-center border-[2px] border-mainPurple rounded-full p-[1px]`}>
            <Image
              src={'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg'} 
              width={40} height={40} alt={'chatRoomImage'} 
              style={{objectFit: 'cover', width: '100%', height: '100%'}} 
              quality={100} 
              sizes='100vw' 
              className='rounded-full' 
            />  
          </div>
          <div className='flex flex-col pl-[10px]'>
            <div className='flex items-center gap-[4px]'>
              <span className={`font-[700] ${isChatModalMax ? 'text-[16px]' : 'text-[15px]'} `}>체인지잇</span>
              <ShopIcon/>
              <span className='font-[500] text-[11px] text-textDarkPurple'>지금 활동 중</span>
              <UserActiveIcon/>
            </div>
            <div>
              <span className={`font-[500] ${isChatModalMax ? 'text-[14px]' : 'text-[11px]'}  text-textDarkPurple`}>운영중 09:00 ~ 18:00</span>
            </div>
          </div>
        </div>
        <button
          className='w-[30px] h-[20px] flex items-center justify-center'
          onClick={clickCloseChatRoom}
        >
          <CloseButtonIcon />
        </button>
      </div>

      <div className={`${!isChatRoomOpened && 'hidden'} w-full h-full py-[10px] z-40 flex flex-col gap-[13px] overflow-hidden overflow-y-scroll bg-lightPurple`}>
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex px-2 ${message.sender === userNickName ? 'justify-end' : 'justify-start'}`}
          >
            {message.sender === userNickName ? (
              <div className='inline-block min-w-[10%] max-w-[60%] bg-mainPurple rounded-2xl break-words'>
                <p className='py-1 px-2 font-[500] text-[0.625rem] text-white break-words'>
                  {message.content}
                </p>
              </div>
            ) : (
              <div className='inline-block max-w-[60%] bg-white rounded-2xl break-words'>
                <p className='py-1 px-2 font-[500] text-[0.625rem] text-mainPurple break-words'>
                  {message.content}
                </p>
              </div>
            )}
          </div>
        ))}
        {/* This div will help us scroll to the bottom */}
        <div ref={messagesEndRef} />
      </div>

      <div className={`${!isChatRoomOpened && 'hidden'} w-full h-[126px] flex-col bg-white border-t-[1px]  border-mainPurple`}>
        <div className='flex items-center justify-between w-full h-[30px] px-[5px]'>
          <div className='flex gap-[6px]'>
            <button
              onClick={(e)=>{clickIconButton(e)}}
            >
              <MessageIconIcon/>
            </button>
            <button
              onClick={(e)=>{clickPhotoButton(e)}}
            >
              <MessagePhotoIcon/>
            </button>
            <button
              onClick={(e)=>{clickFolderButton(e)}}
            >
              <MessageFolderIcon/>
            </button>
          </div>
          <div className='flex items-center'>
            <span className={`font-[400] text-[10px] ${inputMessage.length === 1000 ? 'text-red' : 'text-textDarkPurple'} `}>{inputMessage.length}</span>
            <span className='font-[400] text-[10px] text-textDarkPurple ml-[3px]'>/1000</span>
            <button 
              className='w-[60px] h-[20px] ml-[10px] flex items-center justify-center bg-mainPurple rounded-[30px]'
              onClick={sendMessage}
            >
              <span className='font-[600] text-[12px] text-white'>전송</span>
            </button>
          </div>
        </div>
        <div className='w-full h-[45px] '>
          <textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="메시지를 입력하시오."
            className='w-full h-full p-2 resize-none outline-none'
            style={{ border: 'none', height: '100%', boxSizing: 'border-box' }}
            maxLength={1000}
            rows={1}
          />
        </div>
      </div>
    
    </div>
  );
};

export default ChatComponent;
