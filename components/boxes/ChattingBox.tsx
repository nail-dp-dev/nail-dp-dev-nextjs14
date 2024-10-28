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
import { getUserSearchResults } from '../../api/search/getSearch'

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

interface ChatRoomDTO {
  nickname: string;
  profileUrl: string;
  postCount: number;
  savedPostCount: number;
  followerCount: number;
  following: boolean;
}

export default function ChattingBox({ isChatModalShow, isChatModalMax, setIsChatModalMax, handleCloseChatModal }: ChattingBoxProps) {

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
  const [chatRecommendUser, setChatRecommendUser] = useState<ChatRoomDTO[]>();
  const [chatRoomSearchedData, setChatRoomSearchedData] = useState<ChatRoomDTO[]>([])
  const [currentTime, setCurrentTime] = useState(new Date());
  
  const isChatRoomOpened = useSelector((state: RootState) => state.message.isChatRoomOpened);
  const activateChatRoomId = useSelector((state: RootState) => state.message.activateChatRoomId);
  const chatModalMaxWidth = window.innerWidth - 375
  const chatModalMaxHeight = window.innerHeight - 120

  const dispatch = useDispatch();

  const { userData } = useLoggedInUserData();
  const userNickName = userData?.data.nickname;
  const clientRef = useRef<Client | null>(null);

  const clickChatRoom = (e: any, chatRoomId: string) => {
    e.stopPropagation()
    e.preventDefault()
    setChatRoomClicked(prev => !prev)
    dispatch(setChatRoomOpen(true));
    dispatch(setActivateChatRoomId(chatRoomId));
  }
  
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
      searchUser(value.slice(1));
    } else {
      searchChatRoom(value);
    }
  };

  const searchChatRoom = async (term: string) => {
    const result = await getUserSearchResults(term)
    if (result && result.code === 2000) {
      setChatRoomSearchedData(result.data)
    }
  };

  const searchUser = async (term: string) => {
    const result = await getUserSearchResults(term)
    if (result && result.code === 2000) {
      setChatRoomSearchedData(result.data)
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every 60000 ms (1 minute)

    return () => clearInterval(interval); // Cleanup interval on unmount
  }, []);

  // 채팅 리스트 기본 데이터 fetch 하는 useEffect
  useEffect(() => {
    const fetchChatList = async () => {
      try {
        const result = await getAllChatList(category);
        setResponseData(result.data.contents)
        setChatList(result.data.contents.content)
        setCursorId(result.data.cursorId)
      } catch (error) {
        console.error('Failed to fetch shared count:', error);
      }
    }

    fetchChatList()

  }, [category, isChatArrived, activateChatRoomId])

  // 채팅 리스트 업데이트 하는 function
  useEffect(() => {
    const updateChatList = async () => {
      try {
      
      } catch (error) {

      }
    }
  }, [isChatArrived])
  
    // stompjs 연결 및 웹소켓 연결
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

      if (userNickName) {
        stompClient.subscribe(`/sub/chat/list/updates/${userNickName.toString()}`, (list: Message) => {
          const getlist: any = JSON.parse(list.body);
          setIsChatArrived(prev => !prev);
          console.log(getlist, '겟리스트입니다...!')
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

    const fetchUserList = async () => {
      try {
        const result = await getChatRecommend();
        setChatRecommendUser(result.data)
      } catch (error) {
        console.error('Failed to fetch shared count:', error);
      }
    }

    fetchUserList()
  
  }, [])
  
  useEffect(() => {
    if (chatAddedUser.length === 0) {
      setSearchButtonActivate(false)
    } else {
      setSearchButtonActivate(true)
    }
  },[chatAddedUser])

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
                  placeholder='채팅방, 참여자 통합검색'
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
                className=''
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
                        className={`${isChatRoomOpened && !isChatModalMax && 'w-full'} ${isChatRoomOpened && activateChatRoomId === chat.roomId && !isChatModalMax && 'hidden'} w-[325px] h-[62px] rounded-[20px] mx-auto mb-[10px] hover:bg-chatChooseButton transition-all overflow-hidden ${activateChatRoomId === chat.roomId && 'bg-lightPurple'} `}
                      >
                        <button
                          className={`w-full h-full flex items-center justify-between ${activateChatRoomId === chat.roomId && ''} p-[10px]`}
                          onClick={(e) => { clickChatRoom(e, chat.roomId) }}
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

            <div className='w-full flex-1 '>
              {
                !serachInputActivate &&
                <div className='w-full h-full flex flex-col'>
                  <div className={`w-full ${isChatModalMax ? 'h-[300px]' : 'h-[150px]'}  flex flex-col transition-all`}>
                    <div className='w-full h-[40px] flex items-center'>
                      <span className='text-[14px] font-[700]'>최근</span>
                    </div>
                    <div className='w-full flex-1 flex flex-col overflow-y-auto gap-[10px]'>
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
                            <button className='w-[24px] h-[24px] rounded-full'>
                              <PlusIcon />
                            </button>
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
                                <PlusIcon />
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
                
                serachInputActivate &&
                chatRoomSearchedData.map((user, index) => (

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
                      <PlusIcon />
                    </button>
                  </div>

                ))
              }
            </div>
            <button
              className={`w-full h-[38px] flex items-center justify-center gap-[7px] rounded-[200px] ${searchButtonActivate && 'hover:bg-lightPurple'} group ${!searchButtonActivate ? 'bg-darkGray' : 'bg-mainPurple'}`}
              onClick={(e) => { clickCreateNewChatRoom(e, chatAddedUser) }}
              disabled={!searchButtonActivate}
            >
              <ChatPlusIcon className={` ${searchButtonActivate && 'fill-[#B98CE0]'}`} />
              <span className={`text-[14px] font-[700] ${searchButtonActivate && 'group-hover:text-mainPurple'} text-white`}>채팅방 만들기</span>
            </button>
          </div>
        }
      </div>
    )
  }