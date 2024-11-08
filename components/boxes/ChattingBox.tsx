'use client'

import { ChattingBoxProps } from '../../constants/interface'
import SearchIcon from '../../public/assets/svg/small-search.svg'
import ChatMaxIcon from '../../public/assets/svg/close_chat_max.svg'
import CloseChatIcon from '../../public/assets/svg/close_chat.svg'
import ChatPlusIcon from '../../public/assets/svg/chat-plus-icon.svg'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { ChatCategoryElements } from '../../constants'
import { getAllChatList } from '../../api/chat/getAllChatList'
import { postCreateGroupChatRoom } from '../../api/chat/postCreateGroupChatRoom'
import { getChatRecommend } from '../../api/chat/getChatRecommend'
import ChatComponent from '../modal/message/MessageRoom'
import { RootState } from '../../store/store'
import { useDispatch, useSelector } from 'react-redux'
import { setActivateChatRoomId, setChatModalShow, setChatRoomOpen } from '../../store/slices/messageSlice'
import ShopIcon from '../../public/assets/svg/shop-icon.svg'
import SockJS from 'sockjs-client'
import { Client, Message } from '@stomp/stompjs'
import useLoggedInUserData from '../../hooks/user/useLoggedInUserData'
import CloseIcon from '../../public/assets/svg/close-small-icon.svg'
import PlusIcon from '../../public/assets/svg/chat-user-plus-icon.svg'
import PlusedIcon from '../../public/assets/svg/chat-plused-icon.svg'
import { getUserSearchResults } from '../../api/search/getSearch'
import { getChatRecent } from '../../api/chat/getChatRecent'
import { getChatSearchRoom } from '../../api/chat/getChatSeachRoom'

interface Response {
  content: Content;
  empty: boolean;
  first: boolean; 
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable
  size: number;
  sort: Sort 
}

interface Pageable{
  pageNumber: number;
  pageSize: number;
  paged: boolean;
  sort: Sort;
  offset: number;
  unpaged: boolean;
} 

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}

interface Content {
  roomName: string;
  roomId: string;
  unreadCount: number;
  profileUrls: [string];
  lastMessage: string;
  participantCnt: number;
  modifiedAt: any;
  isBusiness: boolean;
  isPinning: boolean;
}

export interface ChatAddedUser {
  profileUrl: string;
  nickname: string;
}

interface ChatRoomUserDTO {
  nickname: string;
  profileUrl: string;
  postCount: number;
  savedPostCount: number;
  followerCount: number;
  following: boolean;
}

interface ChatRoomDTO {
  roomName: string;
  roomId: string;
  unreadCount: number;
  profileUrls: [string];
  lastMessage: string;
  participantCnt: number;
  modifiedAt: any;
  isBusiness: boolean;
  isPinning: boolean;
}

export default function ChattingBox({ isChatModalShow, isChatModalMax, setIsChatModalMax, handleCloseChatModal, setSettingPosition, setIsChatSettingOpen, chatSettingRef, setClickedSettingChatRoomId, isChatComponentShouldRefresh }: ChattingBoxProps) {

  const [category, setCategory] = useState('all')
  const [responseData, setResponseData] = useState<Response>()
  const [chatList, setChatList] = useState<Content[]>()
  const [cursorId, setCursorId] = useState<string>('')
  const [isChatArrived, setIsChatArrived] = useState<boolean>(false);
  const [chatRoomClicked, setChatRoomClicked] = useState<boolean>(false);
  const [searchBoxOpen, setSearchBoxOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchButtonActivate, setSearchButtonActivate] = useState<boolean>(false);
  const [serachInputActivate, setSearchInputActivate] = useState<boolean>(false);
  const [chatAddedUser, setChatAddedUser] = useState<ChatAddedUser[]>([]);
  const [chatRecentUser, setChatRecentUser] = useState<ChatRoomUserDTO[]>();
  const [chatRecommendUser, setChatRecommendUser] = useState<ChatRoomUserDTO[]>();
  const [whichSearched, setWhichSearched] = useState<string>('user');
  const [chatRoomUserSearchedData, setChatRoomUserSearchedData] = useState<ChatRoomUserDTO[]>([]);
  const [chatRoomSearchedData, setChatRoomSearchedData] = useState<ChatRoomDTO[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const isChatRoomOpened = useSelector((state: RootState) => state.message.isChatRoomOpened);
  const activateChatRoomId = useSelector((state: RootState) => state.message.activateChatRoomId);
  const chatModalMaxWidth = window.innerWidth - 375
  const chatModalMaxHeight = window.innerHeight - 120

  const dispatch = useDispatch();

  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname;
  const clientRef = useRef<Client | null>(null);
  
  const longPressThreshold = 500;
  const pressTimerRef = useRef<NodeJS.Timeout | null>(null);
  let [isLongPressTriggered, setIsLongPressTriggered] = useState<boolean>(false);

  const handleMouseDown = (e: any, chatRoomId: string) => {
    
    e.preventDefault(); 

    pressTimerRef.current = setTimeout(() => {
      setIsLongPressTriggered(true);
    }, longPressThreshold);

  };

  const handleMouseUp = (e: any, chatRoomId: string) => {
    e.preventDefault();

    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }

    if (isLongPressTriggered) {
      onLongPress(e,chatRoomId)
    } else if(!isLongPressTriggered && e.button !== 2) {
      onClick(e,chatRoomId)
    }

    setIsLongPressTriggered(false)
  };

  const handleContextMenu = (e: React.MouseEvent, chatRoomId: string) => {
    e.preventDefault();

    if (e.button === 2) {

      if (pressTimerRef.current) {
        clearTimeout(pressTimerRef.current);
        pressTimerRef.current = null;
      }
      const x = e.clientX;
      const y = e.clientY;
      setSettingPosition({ x, y });
      onLongPress(e, chatRoomId); 
    }
  };

  const onClick = (e: React.MouseEvent, chatRoomId: string) => {
    e.preventDefault();
    e.stopPropagation();

    setChatRoomClicked(prev => !prev);
    dispatch(setChatRoomOpen(true));
    dispatch(setActivateChatRoomId(chatRoomId));
  };

  const searchOnChatClick = (e: React.MouseEvent, chatRoomId: string) => {
    e.preventDefault();
    e.stopPropagation();

    setSearchBoxOpen(false)
    setChatRoomClicked(prev => !prev);
    dispatch(setChatRoomOpen(true));
    dispatch(setActivateChatRoomId(chatRoomId));
  }

  const onLongPress = (e: React.MouseEvent, chatRoomId: string) => {
    e.preventDefault();
    e.stopPropagation();

    setIsChatSettingOpen(true)
    setClickedSettingChatRoomId(chatRoomId)
  };

  
  const clickCategory = (e: any, data: string) => {
    e.stopPropagation()
    setCategory(data)
  }

  const clickChatMaxIcon = (e: any) => {
    e.stopPropagation()
    setIsChatModalMax(true)
  }

  const clickCloseChatModal = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    handleCloseChatModal(e)
    setSearchBoxOpen(false)
  }

  const clickCloseChatRoom = (e: any) => {
    e.stopPropagation()
    dispatch(setChatRoomOpen(false));
    dispatch(setActivateChatRoomId(''));
  }
  
  const clickSearchIcon = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setSearchBoxOpen(prev => !prev)
  }

  const clickChatPlusIcon = (e: any) => {
    e.stopPropagation()
    e.preventDefault()
    setSearchBoxOpen(prev => !prev)
  }

  const clickAddChatUserButton = (e: any, profileUrl: string, nickname: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (!chatAddedUser.some((user) => user.nickname === nickname)) {
      setChatAddedUser((prevChatUsers) => [{ profileUrl, nickname }, ...prevChatUsers]);
    }
  };

  const clickDeleteChatUserButton = (e: any, nickname: string) => {
    e.stopPropagation();
    e.preventDefault();
    if (chatAddedUser.some((user) => user.nickname === nickname)) {
      setChatAddedUser((prevChatUsers) => prevChatUsers.filter(user => user.nickname !== nickname));
    }
  }

  const clickCreateNewChatRoom = async (e: any, chatAddedUser: ChatAddedUser[]) => {
    e.stopPropagation();
    e.preventDefault();
    const result = await postCreateGroupChatRoom(chatAddedUser)
    if (result && result.code === 2001) {
      setSearchBoxOpen(false)
      setChatAddedUser([])
      dispatch(setChatModalShow(true));
      dispatch(setChatRoomOpen(true));
      dispatch(setActivateChatRoomId(result.data));
    }
  }

  const getRelativeTime = (modifiedAt: Date) => {
    const now = currentTime; // Use the currentTime state
    const modifiedDate = new Date(modifiedAt);
    const diffInMs = now.getTime() - modifiedDate.getTime();

    const diffInMinutes = Math.floor(diffInMs / 1000 / 60);

    if (diffInMinutes < 1) return "방금 전";
    if (diffInMinutes < 60) return `${diffInMinutes}분 전`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours}시간 전`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}일 전`;

    const diffInWeeks = Math.floor(diffInDays / 7);
    if (diffInWeeks < 4) return `${diffInWeeks}주 전`;

    const diffInMonths = Math.floor(diffInDays / 30);
    if (diffInMonths < 12) return `${diffInMonths}달 전`;

    const diffInYears = Math.floor(diffInMonths / 12);
    return `${diffInYears}년 전`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value !== '') {
      setSearchInputActivate(true)
    } else {
      setSearchInputActivate(false)
    }

    setSearchTerm(value);

    if (value.startsWith('@')) {
      setWhichSearched('user')
      searchUser(value.slice(1));
    } else {
      if(value !== ''){
        setWhichSearched('chat')
      }else {
        setWhichSearched('user')
      }
      searchChatRoom(value);
    }
  };

  const searchChatRoom = async (term: string) => {
    const result = await getChatSearchRoom(term)
    if (result && result.code === 2000) {
      setChatRoomSearchedData(result.data.contents.content)
    }
  };

  const searchUser = async (term: string) => {
    const result = await getUserSearchResults(term)
    if (result && result.code === 2000) {
      setChatRoomUserSearchedData(result.data)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

useEffect(() => {  
  const fetchChatList = async () => {
    try {
      const result = await getAllChatList(category);

      setResponseData(result.data.contents); 
      setChatList(result.data.contents.content);
      setCursorId(result.data.cursorId);

      setResponseData(prevData => {
        return prevData;
      });
    } catch (error) {
      console.error('Failed to fetch shared count:', error);
    }
  };

  fetchChatList();

  // 의존성 배열의 값이 변경될 때마다 실행되도록 설정
}, [category, isChatArrived, activateChatRoomId, isChatComponentShouldRefresh]);


  
    // stompjs 연결 및 웹소켓 연결
  useEffect(() => {
    if (clientRef.current) {
      clientRef.current.deactivate();
    }

    const socket = new SockJS('https://www.naildp.com/api/ws-stomp');
    const stompClient = new Client({
      webSocketFactory: () => socket,
    });


    stompClient.onConnect = () => {

      if (userNickName) {
        stompClient.subscribe(`/sub/chat/list/updates/${userNickName.toString()}`, (list: Message) => {
          const getlist: any = JSON.parse(list.body);
          setIsChatArrived(prev => !prev);
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
  }, [userNickName]);

  // 채팅방 만들기 컴포넌트 여는 버튼 눌렀을 때 실행하는 초기화 useEffect
  useEffect(() => {

    if (!searchBoxOpen) {
      return;
    }

    const fetchRecentUserList = async () => {
      try {
        const result = await getChatRecent();
        setChatRecentUser(result.data)
      } catch (error) {
        console.error('Failed to fetch recent chat user:', error);
      }
    }

    const fetchRecommendUserList = async () => {
      try {
        const result = await getChatRecommend();
        setChatRecommendUser(result.data)
      } catch (error) {
        console.error('Failed to fetch recommend chat user:', error);
      }
    }

    fetchRecentUserList()
    fetchRecommendUserList()
  
  }, [searchBoxOpen])
  
  useEffect(() => {
    if (chatAddedUser.length === 0) {
      setSearchButtonActivate(false)
    } else {
      setSearchButtonActivate(true)
    }
  },[chatAddedUser])

  // 설정창 이외의 부분을 클릭했을 때
  useEffect(() => {
    function handleClickOutside(event:any) {
      if (chatSettingRef.current && !chatSettingRef.current.contains(event.target)) {
        setIsChatSettingOpen(false);
        setClickedSettingChatRoomId('');
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [chatSettingRef]);

    return (
      <div
        className={`chattingComponent relative ${isChatModalShow ? 'opacity-100' : 'opacity-0 pointer-events-none'} absolute chatModal flex flex-col items-center justify-center transition-all rounded-[20px] border-[2px] border-purple bg-white duration-500 overflow-hidden`}
        style={{
          width: isChatModalMax ? chatModalMaxWidth : '360px',
          height: isChatModalMax ? chatModalMaxHeight : '600px'
        }}
      >
      
        <div className='topBar w-full h-[40px] z-40 flex items-center justify-between bg-white  border-b border-darkGray px-[12px] '>

          <div className={`searchBoxDiv flex items-center justify-start gap-[5px] ${searchBoxOpen ? 'flex-1' : 'w-[40px]'} transition-all`}>
            <form className={`serchBarForm  h-[25px] flex items-center justify-start border-[1px] rounded-[20px] ${searchBoxOpen ? 'border-purple flex-1' : 'border-transparent w-[40px]'}  pl-[5px] gap-[5px] transition-all`}>
              <label htmlFor="searchBar">
                <button
                  onClick={(e) => { clickSearchIcon(e) }}
                  className='flex items-center justify-center'
                >
                  <SearchIcon />
                </button>
              </label>
              {
                searchBoxOpen &&
                <input
                  type="text"
                  id='searchBar'
                  className='searchBar w-[80%] border-none outline-none bg-transparent text-[11px]'
                  placeholder='채팅방 검색, 참여자는 @로 시작하여 검색'
                  value={searchTerm}
                  onChange={handleChange}
                />
              }
            </form>
            <button
              onClick={(e) => clickChatPlusIcon(e)}
              className=' w-[25px] h-[25px] flex items-center justify-center'
            >
              <ChatPlusIcon className='fill-[#B98CE0]' />
            </button>
          </div>


          <div className='reactButtonBox w-[50px] h-full flex items-center gap-[10px] justify-end'>

            {
              !isChatModalMax &&
              <button
                className=' xs:hidden sm:hidden lg:block'
                onClick={(e) => clickChatMaxIcon(e)}>
                <ChatMaxIcon />
              </button>
            }
            <button
              className='  '
              onClick={(e) => clickCloseChatModal(e)}>
              <CloseChatIcon />
            </button>
          </div>
        </div>


        {
          // search box click 안했을 때 나오는 창
          !searchBoxOpen &&
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
                      onClick={(e) => { clickCategory(e, item.data) }}
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
                    chatList &&
                    chatList.length === 0 &&
                    <div className='p-[10px] w-full h-full '>
                      <div className='bg-darkGray w-full h-full flex items-center justify-center rounded-[20px] overflow-hidden'>
                        채팅이 없습니다.
                      </div>
                    </div>
                  }
                  {
                    chatList &&
                    chatList.map((chat, index) => (
                      <li
                        key={index}
                        className={`${isChatRoomOpened && !isChatModalMax && 'w-full'} relative ${isChatRoomOpened && activateChatRoomId === chat.roomId && !isChatModalMax && 'hidden'} w-[325px] h-[62px] rounded-[20px] mx-auto mb-[10px] hover:bg-chatChooseButton transition-all  ${activateChatRoomId === chat.roomId && 'bg-lightPurple'} `}
                      >

                        <button
                          className={`w-full h-full flex items-center justify-between ${activateChatRoomId === chat.roomId && ''} p-[10px]`}
                          onMouseDown={(e) => handleMouseDown(e, chat.roomId)}
                          onMouseUp={(e) => handleMouseUp(e, chat.roomId)}
                          onContextMenu={(e) => handleContextMenu(e, chat.roomId)}
                          onTouchStart={(e) => handleMouseDown(e, chat.roomId)}
                          onTouchEnd={(e) => handleMouseUp(e, chat.roomId)}
                        >
                          <div className={`chatRoomImage bg-white rounded-full ${activateChatRoomId === chat.roomId && isChatRoomOpened ? 'w-[40px] h-[40px] z-40' : activateChatRoomId !== chat.roomId && isChatRoomOpened && !isChatModalMax ? 'w-[30px] h-[30px]' : 'w-[40px] h-[40px]'} mr-[10px]`}>
                            <Image
                              src={chat.profileUrls[0]}
                              width={40} height={40} alt={'chatRoomImage'}
                              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                              quality={100}
                              sizes='100vw'
                              className='rounded-full'
                            />
                          </div>
                          <div className='flex-1 h-[50px] flex justify-between py-[5px]'>
                            <div className='flex-1 w-[200px] h-full flex flex-col items-start justify-center gap-[5px]'>
                              <div className='flex items-center gap-[5px]'>
                                <span className='font-[700] text-[14px] text-textDarkPurple overflow-hidden whitespace-nowrap text-ellipsis' style={{ maxWidth: '170px' }}>
                                  {chat.roomName}
                                </span>                            {
                                  chat.isBusiness &&
                                  <ShopIcon />
                                }
                              </div>
                              <div>
                                <span className='font-[400] text-[11px] text-left text-textDarkPurple overflow-hidden whitespace-nowrap text-ellipsis block w-[200px]'>
                                  {chat.lastMessage}
                                </span>
                              </div>
                            </div>
                            <div className='min-w-[40px] h-full flex flex-col items-end justify-between '>
                              <span className='font-[400] text-[8px] text-dateGray'>{getRelativeTime(chat.modifiedAt)}</span>
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
        }

        {
          // search box click 했을 때 나오는 창
          searchBoxOpen && 
          <div className='contentBox w-full flex-1 flex gap-[10px] flex-col items-center justify-start overflow-hidden p-[10px]'>
            {
              whichSearched !== 'chat' &&
              <div className='addUserBoxDiv w-full h-[75px] flex flex-col items-start justify-center bg-lightPurple rounded-[12px]'>
                <span className='text-[11px] font-[700] text-textDarkPurple mx-[10px] my-[5px]'>대화상대 선택</span>
                <div className='w-full flex-1 overflow-x-auto overflow-hidden px-[10px] rounded-[12px] hide-scrollbar mr-[10px]'>
                  <div className='h-full flex items-center justify-start space-x-[5px]'>
                    {
                      chatAddedUser.map((user, index) => (
                        <div key={index} className='relative w-[34px] h-[34px] min-w-[34px] flex-shrink-0 rounded-full bg-darkGray'>
                          <Image
                            src={user.profileUrl.toString()}
                            alt='profileImage'
                            width={34} height={34}
                            style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                            quality={100}
                            sizes='100vw'
                            className='rounded-full'
                          />
                          <button
                            onClick={(e) => { clickDeleteChatUserButton(e, user.nickname) }}
                            className='absolute top-0 right-0 translate-x-[2px] translate-y-[-2px]'>
                            <CloseIcon />
                          </button>
                        </div>
                      ))
                    }
                  </div>
                </div>
              </div>
            }

            <div className='w-full flex-1'>
              {
                !serachInputActivate &&
                <div className='w-full h-full flex flex-col'>
                  <div className={`w-full ${isChatModalMax ? 'h-[300px]' : 'h-[150px]'}  flex flex-col transition-all`}>
                    <div className='w-full h-[40px] flex items-center'>
                      <span className='text-[14px] font-[700]'>최근</span>
                    </div>
                    <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[10px]'>
                      {
                        chatRecentUser &&
                        chatRecentUser.map((user, index) => (

                          <div key={index} className='userBoxDiv w-full h-[50px] flex-shrink-0 flex items-center justify-between hover:bg-lightPurple rounded-[20px] pl-[5px] pr-[15px]'>
                            <div className='w-[220px] h-full flex items-center justify-between'>
                              <div className='profileImageDiv w-[40px] h-[40px] rounde-full overflow-hidden'>
                                <Image
                                  src={user.profileUrl}
                                  alt='profileImage'
                                  width={40} height={40}
                                  style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                  quality={100}
                                  sizes='100vw'
                                  className='rounded-full'
                                />
                              </div>
                              <div className='profileInfoDiv w-[170px] h-full flex flex-col items-start justify-center '>
                                <p className='text-[14px] font-[500]'>{user.nickname}</p>
                                <div className='flex items-center gap-[4px] text-[11px] font-[400] text-textDarkPurple'>
                                  <span>게시물 {user.postCount}</span>
                                  <span>저장됨 {user.savedPostCount}</span>
                                  <span>팔로워 {user.followerCount}</span>
                                </div>
                              </div>
                            </div>
                            {
                              chatAddedUser.length === 0 ? 
                              <button
                                onClick={(e) => {
                                  clickAddChatUserButton(e, user.profileUrl, user.nickname)
                                }}
                                className='w-[24px] h-[24px] rounded-full'>
                                <PlusIcon /> 
                              </button>
                              : chatAddedUser.find((addedUser) => addedUser.nickname === user.nickname) ?
                              <button
                                onClick={(e) => {
                                  clickDeleteChatUserButton(e, user.nickname)
                                }}
                                className='w-[24px] h-[24px] rounded-full'>
                              <PlusedIcon />
                              </button>
                              :
                              <button
                                onClick={(e) => {
                                  clickAddChatUserButton(e, user.profileUrl, user.nickname)
                                }}
                                className='w-[24px] h-[24px] rounded-full'>
                                <PlusIcon />
                              </button>
                            }
                          </div>

                        ))
                      }
                    </div>
                  </div>
                  <div className='w-full flex-1 flex flex-col '>
                    <div className='w-full h-[40px] flex items-center'>
                      <span className='text-[14px] font-[700]'>추천 더 보기</span>
                    </div>
                    <div className={`w-full ${isChatModalMax ? 'h-[420px]' : 'h-[213px]'} flex flex-col overflow-y-auto gap-[10px] transition-all`}>
                      <div className='w-full h-[50px] flex-shrink-0 '>
                        {
                          chatRecommendUser &&
                          chatRecommendUser.map((user, index) => (
                            <div key={index} className='userBoxDiv w-full h-[50px] flex-shrink-0 flex items-center justify-between hover:bg-lightPurple rounded-[20px] pl-[5px] pr-[15px]'>
                              <div className='w-[220px] h-full flex items-center justify-between'>
                                <div className='profileImageDiv w-[40px] h-[40px] rounde-full overflow-hidden'>
                                  <Image
                                    src={user.profileUrl}
                                    alt='profileImage'
                                    width={40} height={40}
                                    style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                    quality={100}
                                    sizes='100vw'
                                    className='rounded-full'
                                  />
                                </div>
                                <div className='profileInfoDiv w-[170px] h-full flex flex-col items-start justify-center '>
                                  <p className='text-[14px] font-[500]'>{user.nickname}</p>
                                  <div className='flex items-center gap-[4px] text-[11px] font-[400] text-textDarkPurple'>
                                    <span>게시물 {user.postCount}</span>
                                    <span>저장됨 {user.savedPostCount}</span>
                                    <span>팔로워 {user.followerCount}</span>
                                  </div>
                                </div>
                              </div>
                              <button
                                onClick={(e) => {
                                  clickAddChatUserButton(e, user.profileUrl, user.nickname)
                                }}
                                className='w-[24px] h-[24px] rounded-full'>
                                {
                                  chatAddedUser.length === 0 ? <PlusIcon /> : chatAddedUser.find((addedUser) => addedUser.nickname === user.nickname) ?
                                  <PlusedIcon />
                                  :
                                  <PlusIcon />
                                }
                              </button>
                            </div>

                          ))
                        }
                      </div>
                    </div>
                  </div>
                </div>
              }
              {
                // 사용자 검색했을 때 (@로 검색했을 때)
                whichSearched === 'user' && serachInputActivate &&
                <div className={`w-full ${isChatModalMax ? 'h-[850px]' : 'h-[400px]'}  flex flex-col overflow-y-auto overflow-y-scroll gap-[10px]`}>
                    {
                      chatRoomUserSearchedData.map((user, index) => (

                        <div key={index} className='userBoxDiv w-full h-[50px] flex-shrink-0 flex items-center justify-between hover:bg-lightPurple rounded-[20px] pl-[5px] pr-[15px]'>
                          <div className='w-[220px] h-full flex items-center justify-between'>
                            <div className='profileImageDiv w-[40px] h-[40px] rounde-full overflow-hidden'>
                              <Image
                                src={user.profileUrl}
                                alt='profileImage'
                                width={40} height={40}
                                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                                quality={100}
                                sizes='100vw'
                                className='rounded-full'
                              />
                            </div>
                            <div className='profileInfoDiv w-[170px] h-full flex flex-col items-start justify-center '>
                              <p className='text-[14px] font-[500]'>{user.nickname}</p>
                              <div className='flex items-center gap-[4px] text-[11px] font-[400] text-textDarkPurple'>
                                <span>게시물 {user.postCount}</span>
                                <span>저장됨 {user.savedPostCount}</span>
                                <span>팔로워 {user.followerCount}</span>
                              </div>
                            </div>
                          </div>
                          {
                            chatAddedUser.length === 0 ?
                              <button
                                onClick={(e) => {
                                  clickAddChatUserButton(e, user.profileUrl, user.nickname)
                                }}
                                className='w-[24px] h-[24px] rounded-full'>
                                <PlusIcon />
                              </button>
                              : chatAddedUser.find((addedUser) => addedUser.nickname === user.nickname) ?
                                <button
                                  onClick={(e) => {
                                    clickDeleteChatUserButton(e, user.nickname)
                                  }}
                                  className='w-[24px] h-[24px] rounded-full'>
                                  <PlusedIcon />
                                </button>
                                :
                                <button
                                  onClick={(e) => {
                                    clickAddChatUserButton(e, user.profileUrl, user.nickname)
                                  }}
                                  className='w-[24px] h-[24px] rounded-full'>
                                  <PlusIcon />
                                </button>
                          }
                        </div>
                      ))
                    }
                </div>
              }
              {
                // 대화방 검색했을 때
                whichSearched === 'chat' && serachInputActivate &&
                <div className={`w-full ${isChatModalMax ? 'h-[1010px]' : 'h-[530px]'}  flex flex-col overflow-y-auto overflow-y-scroll gap-[10px]`}>
                {
                  chatRoomSearchedData.map((chat, index) => (

                  <div key={index} className='userBoxDiv w-full h-[50px] flex-shrink-0 flex items-center justify-between hover:bg-lightPurple rounded-[20px] pl-[5px] pr-[15px]'>
                    <button
                      className={`w-full h-full flex items-center justify-between ${activateChatRoomId === chat.roomId && ''} p-[10px]`}
                      onMouseDown={(e) => handleMouseDown(e, chat.roomId)}
                      onMouseUp={(e) => handleMouseUp(e, chat.roomId)}
                      onContextMenu={(e) => handleContextMenu(e, chat.roomId)}
                      onTouchStart={(e) => handleMouseDown(e, chat.roomId)}
                      onTouchEnd={(e) => handleMouseUp(e, chat.roomId)}
                      onClick={(e)=>searchOnChatClick(e, chat.roomId)}
                    >
                      <div className={`chatRoomImage bg-white rounded-full ${activateChatRoomId === chat.roomId && isChatRoomOpened ? 'w-[40px] h-[40px] z-40' : activateChatRoomId !== chat.roomId && isChatRoomOpened && !isChatModalMax ? 'w-[30px] h-[30px]' : 'w-[40px] h-[40px]'} mr-[10px]`}>
                        <Image
                          src={chat.profileUrls[0]}
                          width={40} height={40} alt={'chatRoomImage'}
                          style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                          quality={100}
                          sizes='100vw'
                          className='rounded-full'
                        />
                      </div>
                      <div className='flex-1 h-[50px] flex justify-between py-[5px]'>
                        <div className='flex-1 w-[200px] h-full flex flex-col items-start justify-center gap-[5px]'>
                          <div className='flex items-center gap-[5px]'>
                            <span className='font-[700] text-[14px] text-textDarkPurple overflow-hidden whitespace-nowrap text-ellipsis' style={{ maxWidth: '170px' }}>
                              {chat.roomName}
                            </span>                            {
                              chat.isBusiness &&
                              <ShopIcon />
                            }
                          </div>
                          <div>
                            <span className='font-[400] text-[11px] text-left text-textDarkPurple overflow-hidden whitespace-nowrap text-ellipsis block w-[200px]'>
                              {chat.lastMessage}
                            </span>
                          </div>
                        </div>
                        <div className='min-w-[40px] h-full flex flex-col items-end justify-between '>
                          <span className='font-[400] text-[8px] text-dateGray'>{getRelativeTime(chat.modifiedAt)}</span>
                          {
                            chat.unreadCount !== 0 &&
                            <div className='bg-red flex items-center justify-center rounded-full text-white font-[500] text-[11px] min-w-[17px] h-[17px] p-1'>{chat.unreadCount}</div>
                          }
                        </div>
                      </div>
                    </button>
                  </div>  
                ))
                }
                </div>
              }
            </div>
            {
              whichSearched === 'user' &&
            <button
              className={`w-full h-[38px] flex items-center justify-center gap-[7px] rounded-[200px] ${searchButtonActivate && 'hover:bg-lightPurple'} group ${!searchButtonActivate ? 'bg-darkGray' : 'bg-mainPurple'}`}
              onClick={(e) => { clickCreateNewChatRoom(e, chatAddedUser) }}
              disabled={!searchButtonActivate}
            >
              <ChatPlusIcon className={` ${searchButtonActivate && 'fill-[#B98CE0]'}`} />
              <span className={`text-[14px] font-[700] ${searchButtonActivate && 'group-hover:text-mainPurple'} text-white`}>채팅방 만들기</span>
            </button>
            }
          </div>
        }
      </div>
    )
  }