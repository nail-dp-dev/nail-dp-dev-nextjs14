

export const topMenuElements = [
  { icon: 'HomeIcon', name: '아카이브', url:['/', '/trending', '/new'] ,desc: '네일아트 디자인 탐색', isLast:false},
  { icon: 'MyArchiveIcon', name: '내 아카이브', url:['/my-archive','/my-archive/built','/my-archive/following'] , desc: '나만의 네일 감성 아카이브', isLast:false},
  { icon: 'DesignIcon', name: '디자인 제작', url:['/design'] , desc: '네일아트 디자인 제작', isLast:false},
  { icon: 'ReservationIcon', name: '네일 숍 예약', url:['/reservation'] , desc: '내 주변 네일 숍 예약', isLast:false},
  { icon: 'BuyIcon', name: '제품 구매', url:['/buy'] , desc: '수제 네일팁 및 제품 구매', isLast:true},
]

export const bottomMenuElements = [
  { icon: 'MyPageIcon', name: '마이 페이지', url:['/my-page','/my-page/reservation','/my-page/buy'] , desc: '', isLast:false},
  { icon: 'SettingIcon', name: '환경설정', url:['/setting'] , desc: '', isLast:true},
]

export const archiveCategoryElements = [
  { name: 'For You', url: '/' },
  { name: 'Trending', url: '/trending' },
  { name: 'New', url: '/new' },
]

export const myPageCategoryElements = [
  { name: '내 게시물', url: '/my-page' },
  { name: '예약', url: '/my-page/reservation' },
  { name: '구매', url: '/my-page/buy' },
]

export const profileCategoryElements = [
  { name: '게시물', url: '/profile/' },
  { name: '아카이브', url: '/profile/archive/' },
]


export const boxWidths: { [key: number]: string } = {
  '3': '32.86%',
  '4': '24.46%',
  '5': '19.44%'
};

export const profileMiniMenuElements = [
  {name: '기본', data: 'basic'},
  {name: '아이콘', data: 'icon'},
  {name: '사용자 지정', data: 'custom'},
]

export const easyLoginElements = [
  {name: '카카오 로그인', data: 'kakao', color:'kakaoYellow', url: 'https://kauth.kakao.com/oauth/authorize?client_id=9b9bc77db969307e9d338f8752ff53e8&redirect_uri=http://localhost:8080/api/auth/kakao/callback&response_type=code'},
  {name: '구글로 로그인', data: 'google', color: 'googleGray', url: ''},
  {name: '네이버 로그인', data: 'naver', color: 'naverGreen', url: ''},
]