export const topMenuElements = [
  {
    icon: 'HomeIcon',
    name: '아카이브',
    url: ['/', '/trending', '/new'],
    desc: '네일아트 디자인 탐색',
    isLast: false,
  },
  {
    icon: 'MyArchiveIcon',
    name: '내 아카이브',
    url: ['/my-archive', '/my-archive/built', '/my-archive/following'],
    desc: '나만의 네일 감성 아카이브',
    isLast: false,
  },
  {
    icon: 'DesignIcon',
    name: '디자인 제작',
    url: ['/design'],
    desc: '네일아트 디자인 제작',
    isLast: false,
  },
  {
    icon: 'ReservationIcon',
    name: '네일 숍 예약',
    url: ['/reservation'],
    desc: '내 주변 네일 숍 예약',
    isLast: false,
  },
  {
    icon: 'BuyIcon',
    name: '제품 구매',
    url: ['/buy'],
    desc: '수제 네일팁 및 제품 구매',
    isLast: true,
  },
];

export const bottomMenuElements = [
  {
    icon: 'MyPageIcon',
    name: '마이 페이지',
    url: ['/my-page', '/my-page/reservation', '/my-page/buy'],
    desc: '',
    isLast: false,
  },
  {
    icon: 'SettingIcon',
    name: '환경설정',
    url: ['/setting'],
    desc: '',
    isLast: true,
  },
];

export const rowMenuElements = [
  {
    icon: 'HomeIcon',
    name: '아카이브',
    url: ['/', '/trending', '/new'],
    desc: '네일아트 디자인 탐색',
    isLast: false,
  },
  {
    icon: 'MyArchiveIcon',
    name: '내 아카이브',
    url: ['/my-archive', '/my-archive/built', '/my-archive/following'],
    desc: '나만의 네일 감성 아카이브',
    isLast: false,
  },
  {
    icon: 'DesignIcon',
    name: '디자인 제작',
    url: ['/design'],
    desc: '네일아트 디자인 제작',
    isLast: false,
  },
  {
    icon: 'ReservationIcon',
    name: '네일 숍 예약',
    url: ['/reservation'],
    desc: '내 주변 네일 숍 예약',
    isLast: false,
  },
  {
    icon: 'BuyIcon',
    name: '제품 구매',
    url: ['/buy'],
    desc: '수제 네일팁 및 제품 구매',
    isLast: true,
  },
  {
    icon: 'MyPageIcon',
    name: '마이 페이지',
    url: ['/my-page', '/my-page/reservation', '/my-page/buy'],
    desc: '',
    isLast: false,
  },
  {
    icon: 'SettingIcon',
    name: '환경설정',
    url: ['/setting'],
    desc: '',
    isLast: true,
  },  
]

export const archiveCategoryElements = [
  // foryou 개발 완료 시 주석 제거
  // { name: 'For You', desc: 'for-you' },
  { name: 'Trending', desc: 'trending' },
  { name: 'New', desc: 'new' },
];

export const myPageCategoryElements = [
  { name: '내 게시물', desc: 'myPost' },
  { name: '예약', desc: 'reservation' },
  { name: '구매', desc: 'buy' },
];

export const profileCategoryElements = [
  { name: '게시물', url: '/profile/' },
  { name: '아카이브', url: '/profile/archive/' },
];

export const tagElements = [
  { name: '유광', desc: 'glossy' },
  { name: '무광', desc: 'matte' },
  { name: '긴손톱', desc: 'long-nails' },
  { name: '짧은손톱', desc: 'short-nails' },
  { name: '라운드', desc: 'round' },
  { name: '스퀘어', desc: 'square' },
  { name: '스틸레토', desc: 'stiletto' },
  { name: '코핀', desc: 'coffin' },
  { name: '오벌', desc: 'oval' },
  { name: '아몬드', desc: 'almond' },
];

export const postBoxWidths: { [key: number]: string } = {
  '3': '32.86%',
  '4': '24.46%',
};

export const profileMiniMenuElements = [
  { name: '기본', data: 'BASIC' },
  { name: '아이콘', data: 'ICON' },
  { name: '사용자 지정', data: 'CUSTOMIZATION' },
];

export const basicProfileImageElements = [
  '/assets/img/profile/basic/basic_1.png',
  '/assets/img/profile/basic/basic_2.png',
  '/assets/img/profile/basic/basic_3.png',
  '/assets/img/profile/basic/basic_4.png',
  '/assets/img/profile/basic/basic_5.png',
  '/assets/img/profile/basic/basic_6.png',
  '/assets/img/profile/basic/basic_7.png',
  '/assets/img/profile/basic/basic_8.png',
  '/assets/img/profile/basic/basic_9.png',
  '/assets/img/profile/basic/basic_10.png',
  '/assets/img/profile/basic/basic_11.png',
  '/assets/img/profile/basic/basic_12.png',
  '/assets/img/profile/basic/basic_13.png',
  '/assets/img/profile/basic/basic_14.png',
  '/assets/img/profile/basic/basic_15.png',
  '/assets/img/profile/basic/basic_16.png',
  '/assets/img/profile/basic/basic_17.png',
  '/assets/img/profile/basic/basic_18.png',
  '/assets/img/profile/basic/basic_19.png',
];

export const iconProfileImageElements = ['/assets/img/profile/icon/icon_1.png'];

export const easyLoginElements = [
  {
    name: '카카오 로그인',
    data: 'kakao',
    color: 'kakaoYellow',
    uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
  },
  {
    name: '구글로 로그인',
    data: 'google',
    color: 'googleGray',
    uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI,
  },
  {
    name: '네이버 로그인',
    data: 'naver',
    color: 'naverGreen',
    uri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI,
  },
];

export const signUpProcedureLists = [
  {
    procedure: 'agreement',
    name: '약관 동의',
    number: 1,
    fisrtDesc: '네디플에 오신 걸 환영해요!',
    secondDesc: '서비스 이용과 가입을 위해 약관동의가 필요해요.',
  },
  {
    procedure: 'phone',
    name: '본인 인증',
    number: 2,
    fisrtDesc: '안전한 서비스 이용을 위해',
    secondDesc: '본인인증을 완료해주세요.',
  },
  {
    procedure: 'nickname',
    name: '닉네임 설정',
    number: 3,
    fisrtDesc: '네디플에서 사용하실',
    secondDesc: '별명은 무엇으로 할까요?',
  },
];

export const signUpConsentItems = [
  {
    name: '[필수] 네디플 이용약관 동의',
    need: true,
    desc: '이 내용은 네디플 이용약관 동의 에 관한 내용입니다.',
  },
  {
    name: '[필수] 개인정보 수집 이용 동의',
    need: true,
    desc: '이 내용은 개인정보 수집 이용 동의 에 관한 내용입니다.',
  },
  {
    name: '[필수] 전자금융거래 이용약관 동의',
    need: true,
    desc: '이 내용은 전자금융거래 이용약관 동의 에 관한 내용입니다.',
  },
  {
    name: '[선택] 개인정보 수집 이용 동의',
    need: false,
    desc: '이 내용은 개인정보 수집 이용 동의 에 관한 내용입니다.',
  },
];

export const getPostsNumber: {
  [key: number]: { number: number };
} = {
  3: { number: 16 },
  4: { number: 20 },
};

export const getArchivePath: {
  // '/': { result: string };
  '/new': { result: string };
  '/trending': { result: string };
} = {
  // '/': { result: 'FORYOU' },
  '/new': { result: 'NEW' },
  '/trending': { result: 'TRENDING' },
};

export const archiveActionElements = [
  {
    icon: 'MenuSettingIcon',
    label: '아카이브 설정',
    onClick: () => console.log('아카이브 설정 클릭됨'),
  },
  {
    icon: 'MenuCopyIcon',
    label: '아카이브 복제',
    onClick: () => console.log('아카이브 복제 클릭됨'),
  },
  {
    icon: 'MenuShareIcon',
    label: '아카이브 공유',
    onClick: () => console.log('아카이브 공유 클릭됨'),
  },
];

export const postActionElements = [
  {
    icon: 'MenuSettingIcon',
    label: '게시물 설정',
    onClick: () => console.log('게시물 설정 클릭됨'),
  },
  {
    icon: 'MenuPostEditIcon',
    label: '게시물 수정',
  },
  {
    icon: 'MenuShareIcon',
    label: '게시물 공유',
  },
];

export const settingElements = [
  { label: '전체공개', onClick: () => console.log('전체공개 클릭됨') },
  { label: '팔로워공개', onClick: () => console.log('팔로워공개 클릭됨') },
  { label: '비공개', onClick: () => console.log('비공개 클릭됨') },
];

export const shareMenuElements = [
  { icon: 'MenuChatIcon', label: '채팅으로 공유', message: '채팅으로 공유' },
  { icon: 'MenuKakaoIcon', label: '카카오톡 공유', message: '카카오톡 공유' },
  { icon: 'MenuUrlIcon', label: 'URL 복사', message: 'URL 복사' },
];

export const myArchiveElements = [
  { name: 'archive', desc: '아카이브별' },
  { name: 'made', desc: '제작된 디자인' },
  { name: 'following', desc: '팔로잉' },
];

export const archiveModalElements = [
  { name: 'archiveCreate', desc: '새로운 아카이브 생성' },
  { name: 'myArchive', desc: '내 아카이브' },
];

export const ProfileElements = [
  { name: '게시물', desc: 'post' },
  { name: '아카이브', desc: 'archive' },
];

export const FooterElements = [
{ name: '회사소개', uri: 'company-introduce' }, 
{ name: '제휴제안', uri: 'suggestion' }, 
{ name: '이용약관', uri: 'terms-of-service' }, 
{ name: '개인정보 처리방침', uri: 'privacy-policy' }, 
{ name: '전자금융거래 이용약관', uri: 'electronic-financial-transactions' }, 
{ name: '고객센터', uri: 'customer-support' }, 
]

export const ChatCategoryElements = [
  {name: '전체', data: 'all'},
  {name: '친구', data: 'personal'},
  {name: '네일숍', data: 'shop'},
]

export const ManagementMenu = [
  { name: '구독/결제', desc: '', type:'menu' },
  { name: '구독 관리', desc: '구독상태 조회・변경・취소', type:'element' },
  { name: '결제 관리', desc: '결제 수단・청구・취소・환불', type:'element' },
  { name: '비츠 관리', desc: '비츠 결제・지급・회수 처리', type:'element' },
  { name: '인보이스 관리', desc: '상업 문서 발송 조회・재발행', type:'element' },
  { name: '비즈니스 계정 전환 신청', desc: '접수・전환 처리', type:'element' },
  { name: '게시글', desc: '', type:'menu' },
  { name: '전체 게시글 관리', desc: '조회・숨김・삭제 처리', type:'element' },
  { name: '해시태그 관리', desc: '조회・삭제・생성제한 처리', type:'element' },
  { name: '콘텐츠 관리', desc: '유료 광고・검토・승인처리', type:'element' },
  { name: '제품구매/예약', desc: '', type:'menu' },
  { name: '매장 등록 관리', desc: '입점 승인・제품등록・매장 프로필', type:'element' },
  { name: '주문 및 배송 관리', desc: '사용자 주문 조회・교환・반품 처리', type:'element' },
  { name: '예약 관리', desc: '네일샵 예약 조회・변경・예약금 결제', type:'element' },
  { name: '디자인 제작', desc: '', type:'menu' },
  { name: '디자인 업로드', desc: '디자인 요소・템플릿 등록', type:'element' },
  { name: '데이터 연결 관리', desc: '디지털 자산・제품 연결', type:'element' },
  { name: '제작된 디자인 상품화', desc: '주문 제작 관리', type:'element' },
  { name: '사용자 계정', desc: '', type:'menu' },
  { name: '간편 로그인 관리', desc: '간편 로그인 정보 조회・연동 관리', type:'element' },
  { name: '회원 정보 관리', desc: '사용자 개인 정보 조회・변경 처리', type:'element' },
  { name: '관리자 설정', desc: '', type:'menu' },
  { name: '관리자 계정 설정', desc: '관리자 등록 현황・추가・삭제', type:'element' },
  { name: '권한 관리', desc: '관리자 권한 등록・변경 처리', type:'element' },
  { name: '보고 및 분석', desc: '모니터링・로그 보고 및 분석', type:'element' },
]

export const SettingElements = [
  { name: '구독/결제 관리', desc: 'subscribe',menu:'결제수단 비츠' },
  { name: '내 계정', desc: 'myAccount',menu:'내 계정 관리' },
  { name: '알림 설정', desc: 'alarm',menu:'알림 상세 설정' },
  { name: '채팅 설정', desc: 'chat' ,menu:'채팅방 보기 설정'},
  { name: '테마 설정', desc: 'theme' ,menu:'화면 테마'},
  { name: '언어 설정', desc: 'language',menu:'현재 설정'},
]

export const AlarmSettingElements = [
  { name: '게시글 저장 알림', desc: '누군가 내 게시글을 저장하면 알림을 표시합니다.' },
  { name: '게시글 하트 알림', desc: '내 게시글에 하트가 눌리면 알림을 표시합니다.' },
  { name: '게시글 언급 알림', desc: '누군가 게시글에 나를 언급하면 알림을 표시합니다.' },
  { name: '게시글 댓글 알림', desc: '내 게시글에 댓글이 달리면 알림을 표시합니다.' },
  { name: '댓글 하트 알림', desc: '내 댓글에 하트가 눌리면 알림을 표시합니다.'},
  { name: '댓글 언급 알림', desc: '나를 언급한 댓글이 생기면 알림을 표시합니다.'},
  { name: '팔로워 알림', desc: '누군가가 나를 팔로우하면 알림을 표시합니다.' },
  { name: '팔로잉 알림', desc: '내가 팔로잉한 사람이 게시글을 올리면 알림을 표시합니다.' },
  { name: '예약 알림', desc: '네일숍 예약시 알림을 표시합니다.' },
  { name: '배송 알림', desc: '제품의 배송현황에 따라 알림을 표시합니다.' },
  { name: '이벤트 알림', desc: '이벤트가 생기면 알림을 표시합니다.'},
]

export const ChatViewElements = [
  { name: '최신순 (기본정렬)', desc: '최신순' },
  { name: '즐겨찾기순', desc: '고정한 채팅방 순서' },
  { name: '안읽은순', desc: '메세지가 작성된 시간 순서' },
]

export const ScreenThemeElements = [
  { name: '라이트 모드', desc: 'light' },
  { name: '다크 모드', desc: 'dark' },
]

export const PaymentElements = [
  { name: '버츠 사용 내역', desc: '비츠' },
  { name: '카드 사용 내역', desc: '카드' },
  { name: '계좌 사용 내역', desc: '계좌' },
]