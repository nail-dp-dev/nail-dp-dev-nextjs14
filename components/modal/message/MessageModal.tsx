'use client';

import ChatIcon from '../../../public/assets/svg/chat.svg';
import { useGesture } from "react-use-gesture";
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
  const dispatch = useDispatch()
  const path = usePathname();
  const [dragEndXY, setDragEndXY] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 100 });
  const [isChatModalMax, setIsChatModalMax] = useState<boolean>(false);
  const [wasDragged, setWasDragged] = useState(false);
  const domTarget = useRef<HTMLDivElement>(null);
  const chatModalMaxWidth = window.innerWidth - 375
  const chatModalMaxHeight = window.innerHeight - 120

  useEffect(() => {
    const iconWidth = isChatModalVisible && isChatModalMax ? chatModalMaxWidth : isChatModalVisible && !isChatModalMax ? 360 : 80;
    const iconHeight = isChatModalVisible && isChatModalMax ? chatModalMaxHeight : isChatModalVisible && !isChatModalMax ? 600 : 75;

    const clampedX = Math.min(Math.max(dragEndXY.x, 0), window.innerWidth - iconWidth);
    const clampedY = Math.min(Math.max(dragEndXY.y, 0), window.innerHeight - iconHeight);

    api.start({
      x: clampedX,
      y: clampedY,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isChatModalVisible, isChatModalMax, dragEndXY]);

  const handleClickMessageIcon = (e: any) => {
    e.stopPropagation();
    if (!wasDragged) {
      dispatch(setChatModalShow(true));
    }
  };

  const handleCloseChatModal = (e: any) => {
    e.stopPropagation();
    if (isChatModalMax) {
      setIsChatModalMax(false)
    } else {
      dispatch(setChatModalShow(false));
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

        const iconWidth = isChatModalVisible && isChatModalMax ? chatModalMaxWidth : isChatModalVisible && !isChatModalMax ? 360 : 80;
        const iconHeight = isChatModalVisible && isChatModalMax ? chatModalMaxHeight : isChatModalVisible && !isChatModalMax ? 600 : 75;

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

        const iconWidth = isChatModalVisible && isChatModalMax ? chatModalMaxWidth : isChatModalVisible && !isChatModalMax ? 360 : 80;
        const iconHeight = isChatModalVisible && isChatModalMax ? chatModalMaxHeight : isChatModalVisible && !isChatModalMax ? 600 : 75;

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

