import { Route, Routes } from 'react-router-dom';
import { DiaryPage, TestPage, UserPage } from './pages';
import { AppFooter, AppHeader } from './components';
import { USER_ROUTE } from './pages/user/constants/routes-path/userRoute.constant';
import './App.css';
import SignUp from './pages/sign/SignUp';
import LoginPage from './pages/login/Login';
import PwdRestting from './pages/login/pwd-resetting/Login.password.resetting.conponent';
import { Chat } from './pages/chat/Chat.main.conponent';
import AccommodationList from './pages/accommodation/AccommodationList.page';
import Main from './pages/main/Main.page';
import { useEffect, useState } from 'react';
import Receipt from './pages/payment/Receipt.page';
import Reservation from './pages/reservation/Reservation.page';
import CartMain from './pages/cart/CartMain.page';
import NonMemberReservation from './pages/non-member-reservation/NonMemberReservation.page';
import AccommodationFormContainer from './pages/admin/accom-reg-form/AccommodationFormContainer.page';
import AccommodationDetail from './pages/accommodationDetail/AccommodationDetail.page';
import ReservationManagementList from './pages/admin/reservation/ReservationManagementList.page';
import ChatRoom from './pages/chat/room/Chat.room.conponent';
import AdminLayout from './pages/admin/layout/AdminLayout.layout';
import RoomMain from './pages/admin/room/RoomMain.component';
import AdminMain from './pages/admin/main/AdminMain.page';
import ReservationManagementDetail from './pages/admin/reservation-detail/ReservationManagementDetail.component';
import { AdminContactPage } from './pages/admin/contact/AdminContact.page';

function App() {
  // 로그인 정보 확인 후 사용자/관리자 처리 용 상태
  const [isAdmin, setIsAdmin] = useState(() => false);

  return (
    <>
      {/* TODO: 사용자 페이지, 관리자 페이지 헤더 분리 */}
      {!isAdmin && <AppHeader />}
      <Routes>
        <Route path='/test' element={<TestPage />} />
        {/* path member로 변경 */}
        {/* 복수형으로  */}
        <Route path='/user' element={<UserPage />}>
          {USER_ROUTE.map((route, idx) => {
            return <Route key={idx} index={route.index} path={route.path} element={<route.element className={route.className} />} />;
          })}
        </Route>
        <Route path='/diary' element={<DiaryPage />} />
        {/* 로그인 부분 */}
        <Route path='/login' element={<LoginPage />}></Route>

        {/* 회원가입 */}
        <Route path='/signUp' element={<SignUp />} />

        {/* 비밀번호 재설정 */}
        <Route path='/resetting' element={<PwdRestting />} />

        {/* 채팅 */}
        <Route path='/chat' element={<Chat />} />

        <Route index element={<Main />} />
        <Route path='/carts' element={<CartMain />} />
        <Route path='/guest/reservations' element={<NonMemberReservation />} />
        <Route path='/accommodations'>
          <Route index element={<AccommodationList />} />
          <Route path='/accommodations/detail' element={<AccommodationDetail />} />
        </Route>
        <Route path='/reservations' element={<Reservation />} />
        <Route path='/payments' element={<Receipt />} />

        {/* 관리자 라우팅 - 추후 AdminLayout 으로 한번 Layout을 잡고 Outlet 할 예정 */}
        <Route path='/admin' element={<AdminLayout />}>
          {/* 사용자 문의 */}
          <Route path='contact' element={<AdminContactPage />} />
          <Route path='accommodations'>
            <Route index element={<AdminMain />} />
            {/* 숙박등록/수정페이지 */}
            <Route path='new' element={<AccommodationFormContainer />} />
            <Route path=':id/edit' element={<AccommodationFormContainer />} />
            {/* 객실등록/수정페이지 */}
            <Route path=':id/rooms' element={<RoomMain />} />
          </Route>
          <Route path='reservations'>
            <Route index element={<ReservationManagementList />} />
            <Route path=':id/detail' element={<ReservationManagementDetail />} />
          </Route>
          <Route path='cancel-reservations' />
        </Route>
        <Route path='/chat/room' element={<ChatRoom />} />
      </Routes>
      {/* TODO: 관리자인 경우 사용자 푸터 제거 */}
      {!isAdmin && <AppFooter />}
    </>
  );
}

export default App;
