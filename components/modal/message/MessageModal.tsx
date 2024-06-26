'use client';

import ChatIcon from '../../../public/assets/svg/chat.svg';
import { useGesture } from "react-use-gesture";
import { useSpring, animated } from 'react-spring';
import { useEffect, useRef, useState } from 'react';
import ChattingBox from '../../boxes/ChattingBox';

export default function MessageModal() {

  const [dragStartXY, setDragStartXY] = useState({
    x: 0,
    y: 0
  })
  const [dragEndXY, setDragEndXY] = useState({
    x: 0,
    y: 0
  })
  const [isChatModalShow, setIsChatModalShow] = useState<boolean>(false);

  const handleClickMessageIcon = (e: any) => {
    e.stopPropagation();
    if (dragStartXY.x === dragEndXY.x && dragStartXY.y === dragEndXY.y) {
      setIsChatModalShow(true);
    }
  };

  const handleCloseChatModal = (e: any) => {
    e.stopPropagation();
    setIsChatModalShow(false);
  };

  useEffect(() => {
    const preventDefault = (e: Event) => e.preventDefault();
    document.addEventListener('gesturestart', preventDefault);
    document.addEventListener('gesturechange', preventDefault);

    return () => {
      document.removeEventListener('gesturestart', preventDefault);
      document.removeEventListener('gesturechange', preventDefault);
    };
  }, []);

  const domTarget = useRef(null);
  const [{ x, y, rotateX, rotateY, rotateZ }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: 0,
      y: 0,
      config: { mass: 5, tension: 350, friction: 40 },
    })
  );

  useGesture(
    {
      onDragStart: ({offset: [x, y]}) => setDragStartXY({ x, y }),
      onDrag: ({ active, offset: [x, y] }) => {
        api.start({ x, y, rotateX: 0, rotateY: 0, scale: active ? 1.4 : 1 });
      },
      onDragEnd: ({offset: [x, y]}) => setDragEndXY({ x, y }),
      onPinch: ({ offset: [d, a] }) => api({ zoom: d / 200, rotateZ: a }),
      onHover: ({ hovering }) =>
        !hovering && api.start({ rotateX: 0, rotateY: 0, scale: 1 })
    },
    { domTarget, eventOptions: { passive: true } }
  );


  return (
    <div className='messageModal absolute w-full h-full z-40 flex items-center justify-end pointer-events-none bottom-0 right-0'>
      <div
        className='absolute'
        style={{ bottom: `${isChatModalShow ? '620px' : '100px'}`, right: `${isChatModalShow ? '380px' : '100px'}` 
}}
      >
      <animated.div
        ref={domTarget}
        className='chatIcon2 pointer-events-auto'
        style={{
          x,
          y,
          rotateX,
          rotateY,
          rotateZ,
        }}
      >
        <animated.div>
          {
            !isChatModalShow &&
            <ChatIcon
              className={`buttonIcon ${isChatModalShow ? 'opacity-0 pointer-events-none':'opacity-100'} absolute transition-opacity duration-500`}
              onClick={e => handleClickMessageIcon(e)}
            />
          }
          {
            isChatModalShow &&
            <ChattingBox isChatModalShow={isChatModalShow} handleCloseChatModal={handleCloseChatModal} />
          }
        </animated.div>
      </animated.div>
      </div>
    </div>
  );
}
