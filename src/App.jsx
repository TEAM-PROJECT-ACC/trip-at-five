import { Route, Routes } from 'react-router-dom';
import { TestPage } from './pages/test/Test.page';
import { AppFooter, AppHeader } from './components';
import './App.css';
import AccommodationList from './pages/accommodation/AccommodationList.page';
import Main from './pages/main/Main.page';
import { useEffect } from 'react';
import Receipt from './pages/payment/Receipt.page';
import Reservation from './pages/reservation/Reservation.page';
import CartMain from './pages/cart/CartMain.page';
import NonMemberReservation from './pages/non-member-reservation/NonMemberReservation.page';
import AccommodationFormContainer from './pages/admin/accom-reg-form/AccommodationFormContainer.page';
import AdminLayout from './pages/admin/layout/AdminLayout.layout';
import RoomMain from './pages/admin/room/RoomMain.component';
import AdminMain from './pages/admin/main/AdminMain.page';

function App() {
  // TODO : 규형님 로그인 상태 확인
  // 1. 비로그인 시 리디렉트 로그인 페이지로
  // 2. 로그인 회원 상태 관리가 zustand 전역 상태 관리로
  // 전역 상태 관리 초기화 (jwt access token, refresh token) 둘 다 없으면 1번 처리
  // 로그아웃 할 때 회원 상태 초기화

  return (
    <>
      <AppHeader />
      <Routes>
        <Route path='/test' element={<TestPage />} />
        {/*
	return (
		<Routes>
			{/*
        // TODO: 회원 팀
        로그인/회원가입
        
        마이페이지(index)
          내 정보
          내 쿠폰
          내 예약
          챌린지
        
        비회원 예약
        나의 일지
        채팅페이지(index)
        문의
        채팅
        
        // TODO: 숙박 팀
        메인
        장바구니
        숙박
          예약
          결제
          목록
          상세보기

        관리자 페이지
          숙박업소관리
          예약관리
          예약취소요청
          사용자문의
          회원관리
      */}

        <Route index element={<Main />} />
        <Route path='/carts' element={<CartMain />} />
        <Route path='/guest/reservations' element={<NonMemberReservation />} />
        <Route path='/accommodations'>
          <Route index element={<AccommodationList />} />
        </Route>
        <Route path='/reservations' element={<Reservation />} />
        <Route path='/payments' element={<Receipt />} />

        {/* 관리자 라우팅 - 추후 AdminLayout 으로 한번 Layout을 잡고 Outlet 할 예정 */}
        <Route path='/admin' element={<AdminLayout />}>
          <Route path='accommodations'>
            <Route index element={<AdminMain />} />
            {/* 숙박등록/수정페이지 */}
            <Route path='new' element={<AccommodationFormContainer />} />
            <Route path=':id/edit' element={<AccommodationFormContainer />} />
            {/* 객실등록/수정페이지 */}
            <Route path=':id/rooms' element={<RoomMain />} />
          </Route>
          <Route path='reservations' />
          <Route path='cancel/reservations' />
        </Route>

        {/* error 컴포넌트 */}
      </Routes>
    </>
  );
}

export default App;
