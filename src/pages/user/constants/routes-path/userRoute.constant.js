import {
  UserInfo,
  MyPage,
  MyCouponPage,
  ChallengePage,
  BookPage,
} from '../../sub-pages';

const PAGE_CLASS = 'user-page';

export const USER_ROUTE = [
  {
    index: true,
    title: '마이페이지',
    path: '',
    element: MyPage,
    className: PAGE_CLASS,
  },
  {
    title: '회원 정보',
    path: 'info',
    element: UserInfo,
    className: PAGE_CLASS,
  },
  {
    title: '내 쿠폰',
    path: 'coupon',
    element: MyCouponPage,
    className: PAGE_CLASS,
  },
  {
    title: '예약 내역',
    path: 'book-history',
    element: BookPage,
    className: PAGE_CLASS,
  },
  {
    title: '챌린지',
    path: 'challenge',
    element: ChallengePage,
    className: PAGE_CLASS,
  },
];
