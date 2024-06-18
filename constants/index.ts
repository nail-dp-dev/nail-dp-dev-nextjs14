import HomeIcon from '../public/assets/svg/home.svg'
import MyArchiveIcon from '../public/assets/svg/my-archive.svg'
import DesignIcon from '../public/assets/svg/design.svg'
import ReservationIcon from '../public/assets/svg/reservation.svg'
import BuyIcon from '../public/assets/svg/buy.svg'
import MyPageIcon from '../public/assets/svg/my-page.svg'
import SettingIcon from '../public/assets/svg/setting.svg'

export const topMenuElements = [
  { icon: HomeIcon, name: '아카이브', url:'/' ,desc: '네일아트 디자인 탐색', isLast:false},
  { icon: MyArchiveIcon, name: '내 아카이브', url:'/my-archive' , desc: '네일아트 디자인 탐색', isLast:false},
  { icon: DesignIcon, name: '디자인 제작', url:'/design' , desc: '네일아트 디자인 탐색', isLast:false},
  { icon: ReservationIcon, name: '네일 숍 예약', url:'/reservation' , desc: '네일아트 디자인 탐색', isLast:false},
  { icon: BuyIcon, name: '제품 구매', url:'/buy' , desc: '네일아트 디자인 탐색', isLast:true},
]
export const bottomMenuElements = [
  { icon: MyPageIcon, name: '마이 페이지', url:'/my-page' , desc: '네일아트 디자인 탐색', isLast:false},
  { icon: SettingIcon, name: '환경설정', url:'/setting' , desc: '네일아트 디자인 탐색', isLast:true},
]