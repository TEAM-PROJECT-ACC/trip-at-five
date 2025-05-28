import { AdminContactPage } from '../../contact/AdminContact.page';
import AdminMain from '../../main/AdminMain.page';

const PAGE_CLASS = 'admin-page';

export const ADMIN_PATH = {
  accommodations: 'accommodations',
  reservations: 'reservations',
  'cancel-reservations': 'cancel-reservations',
  contact: 'contact',
};

export const ADMIN_ROUTE = [
  {
    index: true,
    title: '숙박업소관리',
    path: ADMIN_PATH.accommodations,
    element: AdminMain,
    className: PAGE_CLASS,
  },
  {
    title: '예약관리',
    path: ADMIN_PATH.reservations,
    // element: ,
    className: PAGE_CLASS,
  },
  {
    title: '예약취소요청',
    path: ADMIN_PATH['cancel-reservations'],
    // element: ,
    className: PAGE_CLASS,
  },
  {
    title: '사용자 문의',
    path: ADMIN_PATH.contact,
    element: AdminContactPage,
    className: PAGE_CLASS,
  },
];
