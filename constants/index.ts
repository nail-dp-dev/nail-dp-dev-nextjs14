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

export const postBoxWidths: { [key: number]: string } = {
  '3': '32.86%',
  '4': '24.46%',
  '5': '19.44%',
  '6': '16.08%',
  '7': '13.68%'
};

export const profileMiniMenuElements = [
  { name: '기본', data: 'basic' },
  { name: '아이콘', data: 'icon' },
  { name: '사용자 지정', data: 'custom' },
]

export const easyLoginElements = [
  { name: '카카오 로그인', data: 'kakao', color:'kakaoYellow', uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI },
  { name: '구글로 로그인', data: 'google', color: 'googleGray', uri: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI },
  { name: '네이버 로그인', data: 'naver', color: 'naverGreen', uri: process.env.NEXT_PUBLIC_NAVER_REDIRECT_URI },
]

export const signUpProcedureLists = [
  { procedure: 'agreement', name: '약관 동의', number: 1 , fisrtDesc:'네디플에 오신 걸 환영해요!', secondDesc: '서비스 이용과 가입을 위해 약관동의가 필요해요.' },
  { procedure: 'phone', name: '본인 인증', number: 2, fisrtDesc:'안전한 서비스 이용을 위해', secondDesc: '본인인증을 완료해주세요.' },
  { procedure: 'nickname', name: '닉네임 설정', number: 3 , fisrtDesc:'네디플에서 사용하실', secondDesc: '별명은 무엇으로 할까요?' },
]

export const signUpConsentItems = [
  { name: '[필수] 네디플 이용약관 동의' , need: true , desc: '이 내용은 네디플 이용약관 동의 에 관한 내용입니다.' },
  { name: '[필수] 개인정보 수집 이용 동의' , need: true , desc: '이 내용은 개인정보 수집 이용 동의 에 관한 내용입니다.' },
  { name: '[필수] 전자금융거래 이용약관 동의' , need: true , desc: '이 내용은 전자금융거래 이용약관 동의 에 관한 내용입니다.' },
  { name: '[선택] 개인정보 수집 이용 동의' , need: false , desc: '이 내용은 개인정보 수집 이용 동의 에 관한 내용입니다.' },
]

// export const postIcons = [
//   {icon: "HeartIcon", number: 1},
//   {icon: "chatIcon", number: 1},
//   {icon: "ShareIcon", number: 1},
// ]

export const getPostsNumber: {
  [key: number]: { number: number }
} = {
  3: { number: 30 },
  4: { number: 40 },
  5: { number: 50 },
  6: { number: 60 },
  7: { number: 70 },
};

export const getArchivePath: {
  '/': { result: string },
  '/new': { result: string },
  '/trending': { result: string }
} = {
  '/': { result: 'FORYOU' },
  '/new': { result: 'NEW' },
  '/trending': { result: 'TRENDING' },
}