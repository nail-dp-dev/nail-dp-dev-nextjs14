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
import { setActivateChatRoomId, setChatModalShow, setChatRoomOpen } from '../../../store/slices/messageSlice';
import { patchPinningChatRoom } from '../../../api/chat/patchPinningChatRoom';
import { patchLeaveChatRoom } from '../../../api/chat/patchLeaveChatRoom';

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

  const chatSettingRef = useRef(null);
  const [settingPosition, setSettingPosition] = useState({ x: 0, y: 0 });
  const [isChatSettingOpen, setIsChatSettingOpen] = useState<boolean>(false);
  const [clickedSettingChatRoomId, setClickedSettingChatRoomId] = useState<string>('');

  const [isChatComponentShouldRefresh, setIsChatComponentShouldRefresh] = useState<boolean>(false);

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

  const clickTopFix = async (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();

    const result = await patchPinningChatRoom(clickedSettingChatRoomId)
    if (result.code === 2001) {
      setIsChatSettingOpen(false)
      setIsChatComponentShouldRefresh(prev=>!prev)
    }
  }
  
  const clickOpenChatRoom = (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    dispatch(setChatRoomOpen(true));
    dispatch(setActivateChatRoomId(clickedSettingChatRoomId));
    setIsChatSettingOpen(false)
  }
  
  const clickChatRoomTurnOffAlarm = (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(clickedSettingChatRoomId,`알림 끄기 ${clickedSettingChatRoomId}`)
    setIsChatSettingOpen(false)
  }
  
  const clickSetChatProfileSetting = (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(clickedSettingChatRoomId,`채팅방 프로필 설정 ${clickedSettingChatRoomId}`)
    setIsChatSettingOpen(false)
  }
  
  const clickInviteToChatRoom = (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(clickedSettingChatRoomId,`채팅방으로 초대하기 ${clickedSettingChatRoomId}`)
    setIsChatSettingOpen(false)
  }
  
  const clickChatRoomComplaint = (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    console.log(clickedSettingChatRoomId,`채팅방으로 신고하기 ${clickedSettingChatRoomId}`)
    setIsChatSettingOpen(false)
  }
  
  const clickChatRoomExit = async (e:any, clickedSettingChatRoomId:string) => {
    e.preventDefault();
    e.stopPropagation();
    
    const result = await patchLeaveChatRoom(clickedSettingChatRoomId)
    if (result.code === 2001) {
      setIsChatSettingOpen(false)
      setIsChatComponentShouldRefresh(prev=>!prev)
    } 
    }

  return (
    <div
      className={`${path === '/sign-up' && 'hidden'} ${isLoggedIn === 'pending' && 'hidden'} ${
        isLoggedIn === 'loggedOut' && 'hidden'
      } messageModal absolute w-screen h-screen z-50 flex items-center justify-end pointer-events-none bottom-0 right-0`}
    >
      {isChatSettingOpen &&  (
        <div
          ref={chatSettingRef}
          style={{
            position: 'absolute',
            left: settingPosition.x,
            top: settingPosition.y,
          }}
          className='settingBoxDiv z-50 pointer-events-auto w-[105px] h-[156px] flex flex-col items-center justify-between bg-white border-mainPurple border-[1px] shadow-sm shadow-black overflow-hidden'
        >
          <div className='w-full h-[58px] flex flex-col items-center justify-center'>
            <button 
              onClick={(e)=>{clickTopFix(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
            >채팅방 상단고정</button>
            <button
              onClick={(e)=>{clickOpenChatRoom(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
              >채팅방 열기</button>
            <button
              onClick={(e)=>{clickChatRoomTurnOffAlarm(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
              >채팅방 알림끄기</button>
          </div>
          <div className='border-b-[1px] w-full h-[6px] border-lightPurple'></div>
          <div className='w-full h-[6px]'></div>
          <div className='w-full h-[38px] flex flex-col items-center justify-center'>
            <button 
              onClick={(e)=>{clickSetChatProfileSetting(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
              >채팅방 프로필 설정</button>
            <button 
              onClick={(e)=>{clickInviteToChatRoom(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
              >채팅방에 초대하기</button>
          </div>
          <div className='border-b-[1px] w-full h-[6px] border-lightPurple'></div>
          <div className=' w-full h-[6px] '></div>
          <div className='w-full h-[38px] flex flex-col items-center justify-center'>
            <button 
              onClick={(e)=>{clickChatRoomComplaint(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
              >채팅방 신고하기</button>
            <button 
              onClick={(e)=>{clickChatRoomExit(e, clickedSettingChatRoomId)}}
              className='w-full h-[18px] text-textDarkPurple text-start pl-[10px] text-[11px] font-[400] hover:bg-lightPurple'
            >채팅방 나가기</button>
          </div>

        </div>
      )}
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
              setSettingPosition={setSettingPosition}
              setIsChatSettingOpen={setIsChatSettingOpen}
              chatSettingRef={chatSettingRef}
              setClickedSettingChatRoomId={setClickedSettingChatRoomId}
              isChatComponentShouldRefresh={isChatComponentShouldRefresh}
            />
          )}
        </animated.div>
      </div>
    </div>
  );
}