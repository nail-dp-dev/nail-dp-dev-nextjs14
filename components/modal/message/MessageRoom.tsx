import React, { useEffect, useState, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { getChat } from '../../../api/chat/getChat';
import useLoggedInUserData from '../../../hooks/user/useLoggedInUserData';
import { ChatComponentProps } from '../../../constants/interface';
import CloseButtonIcon from ''

interface ChatMessage {
  mention: string;
  content: [string];
  messageType: any;
  sender: string;
}

const ChatComponent = ({ chatRoomId, clickCloseChatRoom } : ChatComponentProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const clientRef = useRef<Client | null>(null);

  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname

  
  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });
    const getBeforeChat = async (chatRoomId:string) => {
      const result = await getChat(chatRoomId)

      if (result) {
        setMessages(result.data.contents)
      }
    }

    getBeforeChat(chatRoomId)


    stompClient.onConnect = () => {
      console.log('Connected to WebSocket server');

      stompClient.subscribe(`/sub/chat/${chatRoomId}`, (message: Message) => {
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
  }, [chatRoomId]);

  const sendMessage = () => {
    if (clientRef.current && inputMessage.trim()) {
      const messageDto = {
        content: [inputMessage],
                sender: userNickName,
                mention: [],
                messageType: 'TEXT'
      };

      clientRef.current.publish({
        destination: `/pub/chat/${chatRoomId}/message`,
        body: JSON.stringify(messageDto),
      });

      setInputMessage('');
    }
  };

  return (
    <div className='w-full h-full z-40 py-[10px] px-[10px]'>
      <div className='h-[40px] flex items-center justify-between'>
        <div className='bg-red flex-1 h-[50px]'>
            
        </div>
        <button
          onClick={clickCloseChatRoom}
        >
          닫기
        </button>
      </div>


      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>

      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="메시지를 입력하시오."
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
