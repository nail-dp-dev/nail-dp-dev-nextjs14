'use client';

import ChatIcon from '../../../public/assets/svg/chat.svg';
import { useGesture } from "react-use-gesture";
import { useSpring, animated } from 'react-spring';
import { useEffect, useRef, useState } from 'react';
import ChattingBox from '../../boxes/ChattingBox';
import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectLoginStatus } from '../../../store/slices/loginSlice';
import MessageRoom from './MessageRoom';

export default function MessageModal() {
  const isLoggedIn = useSelector(selectLoginStatus);
  const path = usePathname();

  const [dragEndXY, setDragEndXY] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isChatModalShow, setIsChatModalShow] = useState<boolean>(false);
  const [isChatModalMax, setIsChatModalMax] = useState<boolean>(false);
  const [wasDragged, setWasDragged] = useState(false);
  const domTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const iconWidth = isChatModalShow ? 360 : 80;
    const iconHeight = isChatModalShow ? 600 : 75;

    const clampedX = Math.min(Math.max(dragEndXY.x, 0), window.innerWidth - iconWidth);
    const clampedY = Math.min(Math.max(dragEndXY.y, 0), window.innerHeight - iconHeight);

    api.start({
      x: clampedX,
      y: clampedY,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatModalShow, dragEndXY]);

  const handleClickMessageIcon = (e: any) => {
    e.stopPropagation();
    if (!wasDragged) {
      setIsChatModalShow(true);
    }
  };

  const handleCloseChatModal = (e: any) => {
    e.stopPropagation();
    if (isChatModalMax) {
      setIsChatModalMax(false)
    } else {
      setIsChatModalShow(false);
    }
  };

  const [{ x, y, rotateX, rotateY, rotateZ }, api] = useSpring(
    () => ({
      rotateX: 0,
      rotateY: 0,
      rotateZ: 0,
      scale: 1,
      zoom: 0,
      x: dragEndXY.x,
      y: dragEndXY.y,
      config: { mass: 1, tension: 250, friction: 40 },
    })
  );

  useGesture(
    {
      onDrag: ({ movement: [mx, my], active }) => {
        if (mx !== 0 || my !== 0) {
          setWasDragged(true);
        }

        const newX = dragEndXY.x + mx;
        const newY = dragEndXY.y + my;

        const iconWidth = isChatModalShow ? 360 : 80;
        const iconHeight = isChatModalShow ? 600 : 75;

        const clampedX = Math.min(Math.max(newX, 0), window.innerWidth - iconWidth);
        const clampedY = Math.min(Math.max(newY, 0), window.innerHeight - iconHeight);

        api.start({
          x: clampedX,
          y: clampedY,
          rotateX: 0,
          rotateY: 0,
          scale: active ? 1.4 : 1,
        });
      },
      onDragEnd: ({ movement: [mx, my] }) => {
        const newX = dragEndXY.x + mx;
        const newY = dragEndXY.y + my;

        const iconWidth = isChatModalShow ? 360 : 80;
        const iconHeight = isChatModalShow ? 600 : 75;

        const clampedX = Math.min(Math.max(newX, 0), window.innerWidth - iconWidth);
        const clampedY = Math.min(Math.max(newY, 0), window.innerHeight - iconHeight);

        setDragEndXY({
          x: clampedX,
          y: clampedY,
        });

        if (mx === 0 && my === 0) {
          setWasDragged(false);
        }
      },
      onHover: ({ hovering }) => {
        !hovering && api.start({ rotateX: 0, rotateY: 0, scale: 1 });
      },
    },
    { domTarget, eventOptions: { passive: true } }
  );

  return (
    <div
      className={`${path === '/sign-up' && 'hidden'} ${isLoggedIn === 'pending' && 'hidden'} ${
        isLoggedIn === 'loggedOut' && 'hidden'
      } messageModal absolute w-screen h-screen z-[19] flex items-center justify-end pointer-events-none bottom-0 right-0`}
    >
      <div className={`absolute w-full h-full`}>
        <animated.div
          ref={domTarget}
          className={`chatIcon2 pointer-events-auto`}
          style={{
            x,
            y,
            rotateX,
            rotateY,
            rotateZ,
          }}
        >
          {/* {!isChatModalShow ? (
            <ChatIcon
              className={`buttonIcon ${
                isChatModalShow ? 'opacity-0 pointer-events-none' : 'opacity-100'
              } absolute transition-opacity duration-500`}
              onClick={(e) => handleClickMessageIcon(e)}
            />
          ) : (
            <ChattingBox
              isChatModalShow={isChatModalShow}
              isChatModalMax={isChatModalMax}
              setIsChatModalMax={setIsChatModalMax}
              handleCloseChatModal={handleCloseChatModal}
            />
          )} */}
          <MessageRoom chatRoomId='9283e8c1-2a30-45e1-9da3-e4e395e87d89'/>
        </animated.div>
      </div>
    </div>
  );
}

