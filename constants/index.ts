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

export const archiveCategoryElements = [
  { name: 'For You', desc: 'for-you' },
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
  '/': { result: string };
  '/new': { result: string };
  '/trending': { result: string };
} = {
  '/': { result: 'FORYOU' },
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
{ name: '네디플 정책', uri: 'ndp-policy' }, 
{ name: '고객센터ⓒ', uri: 'customer-support' }, 
{ name: 'NDP Corp.', uri: 'ndp-corp' }
]

export const ChatCategoryElements = [
  {name: '전체', data: 'all'},
  {name: '친구', data: 'friend'},
  {name: '네일숍', data: 'shop'},
]