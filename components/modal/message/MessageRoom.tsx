import React, { useEffect, useState, useRef } from 'react';
import { Client, Message } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

interface ChatMessage {
  sender: string;
  content: string;
}

interface ChatProps {
  chatRoomId: string;
}

const ChatComponent: React.FC<ChatProps> = ({ chatRoomId }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
    });

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
                sender: 'User1',
                mention: [],
                messageType: 'TEXT'
      };

      // Send the message to the server
      clientRef.current.publish({
        destination: `/pub/chat/${chatRoomId}/message`,
        body: JSON.stringify(messageDto),
      });

      setInputMessage('');
    }
  };

  return (
    <div className='w-full h-full z-40 p-[20px]'>
      <div className='h-[40px]'></div>
      <h1>Chat Room: {chatRoomId}</h1>

      {/* Display received messages */}
      <div>
        {messages.map((message, index) => (
          <div key={index}>
            <strong>{message.sender}</strong>: {message.content}
          </div>
        ))}
      </div>

      {/* Input field and send button */}
      <input
        type="text"
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send Message</button>
    </div>
  );
};

export default ChatComponent;
