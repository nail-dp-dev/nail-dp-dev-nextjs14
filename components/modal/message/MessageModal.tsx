'use client';

import ChatIcon from '../../../public/assets/svg/chat.svg';
import { useSpring, animated } from 'react-spring';
import { useEffect, useRef, useState } from 'react';
import ChattingBox from '../../boxes/ChattingBox';
import { usePathname } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slices/loginSlice';
import { RootState } from '../../../store/store';
import { setChatModalShow } from '../../../store/slices/messageSlice';

export default function MessageModal() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const isChatModalVisible = useSelector((state: RootState) => state.message.isChatModalShow);
  const dispatch = useDispatch();
  const path = usePathname();
  const [dragEndXY, setDragEndXY] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isChatModalMax, setIsChatModalMax] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 769);
  const domTarget = useRef<HTMLDivElement>(null);
  
  const chatModalMaxWidth = window.innerWidth - 375;
  const chatModalMaxHeight = window.innerHeight - 120;

  const [{ x, y, rotateX, rotateY, rotateZ }, api] = useSpring(() => ({
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    x: dragEndXY.x,
    y: dragEndXY.y,
    config: { mass: 1, tension: 250, friction: 40 },
  }));

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 769);
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  useEffect(() => {
    const iconWidth = isChatModalVisible && isChatModalMax ? chatModalMaxWidth : isChatModalVisible ? 360 : 80;
    const iconHeight = isChatModalVisible && isChatModalMax ? chatModalMaxHeight : isChatModalVisible ? 600 : 75;

    const clampedX = Math.min(Math.max(dragEndXY.x, 0), window.innerWidth - iconWidth);
    const clampedY = Math.min(Math.max(dragEndXY.y, 0), window.innerHeight - iconHeight);

    api.start({ x: clampedX, y: clampedY });
  }, [isChatModalVisible, isChatModalMax, dragEndXY]);

  const handleClickMessageIcon = (e: any) => {
    e.stopPropagation();
    dispatch(setChatModalShow(true));
  };

  const handleCloseChatModal = (e: any) => {
    e.stopPropagation();
    if (isChatModalMax) {
      setIsChatModalMax(false);
    } else {
      dispatch(setChatModalShow(false));
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {

    if (!isMobile) {
      e.stopPropagation();
      e.preventDefault(); 
    }
    
    const touch = e.touches[0];
    const initialX = touch.clientX - dragEndXY.x;
    const initialY = touch.clientY - dragEndXY.y;

    const moveHandler = (moveEvent: TouchEvent) => {
      const touchMove = moveEvent.touches[0];
      const newX = touchMove.clientX - initialX;
      const newY = touchMove.clientY - initialY;

      setDragEndXY({
        x: Math.min(Math.max(newX, 0), window.innerWidth),
        y: Math.min(Math.max(newY, 0), window.innerHeight),
      });
    };

    const endHandler = () => {
      window.removeEventListener('touchmove', moveHandler);
      window.removeEventListener('touchend', endHandler);
    };

    window.addEventListener('touchmove', moveHandler);
    window.addEventListener('touchend', endHandler);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    
    if (!isMobile) {
      e.stopPropagation();
      e.preventDefault(); 
    }

    const initialX = e.clientX - dragEndXY.x;
    const initialY = e.clientY - dragEndXY.y;

    const moveHandler = (moveEvent: MouseEvent) => {
      const newX = moveEvent.clientX - initialX;
      const newY = moveEvent.clientY - initialY;

      setDragEndXY({
        x: Math.min(Math.max(newX, 0), window.innerWidth),
        y: Math.min(Math.max(newY, 0), window.innerHeight),
      });
    };

    const endHandler = () => {
      window.removeEventListener('mousemove', moveHandler);
      window.removeEventListener('mouseup', endHandler);
    };

    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('mouseup', endHandler);
  };

  return (
    <div
      className={`${path === '/sign-up' && 'hidden'} ${isLoggedIn === 'pending' && 'hidden'} ${
        isLoggedIn === 'loggedOut' && 'hidden'
      } messageModal absolute w-screen h-screen z-50 flex items-center justify-end pointer-events-none bottom-0 right-0`}
    >
      <div className={`absolute w-full h-full`}>
        <animated.div
          ref={domTarget}
          onTouchStart={handleTouchStart}
          onMouseDown={handleMouseDown}
          className={`chatIcon2 pointer-events-auto`}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            rotateZ,
          }}
        >
          {!isChatModalVisible ? (
            <ChatIcon
              className={`buttonIcon ${
                isChatModalVisible ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } absolute transition-opacity duration-500`}
              onClick={(e) => handleClickMessageIcon(e)}
            />
          ) : (
            <ChattingBox
              isChatModalShow={isChatModalVisible}
              isChatModalMax={isChatModalMax}
              setIsChatModalMax={setIsChatModalMax}
              handleCloseChatModal={handleCloseChatModal}
            />
          )}
        </animated.div>
      </div>
    </div>
  );
}
