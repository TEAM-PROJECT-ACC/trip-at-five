import { Route, Routes } from 'react-router-dom';
import { DiaryPage, TestPage, UserPage } from './pages';
import { AppFooter, AppHeader, Select } from './components';
import { USER_ROUTE } from './pages/user/constants/routes-path/userRoute.constant';
import LoginPage from './pages/login/Login.page';
import Register from './pages/register/Register.page';
import PwdResetting from './pages/pwdResetting/PwdResetting.page';
import { Chat } from './pages/chat/ChatMain.page';
import ChatRoom from './pages/chat/chat-ui/ChatRoom.component';
import LoginInterceptor from './pages/login/loginInterCepter/LoginInterceptor.component';
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
import AdminLayout from './pages/admin/layout/AdminLayout.layout';
import RoomMain from './pages/admin/room/RoomMain.component';
import AdminMain from './pages/admin/main/AdminMain.page';
import ReservationManagementDetail from './pages/admin/reservation-detail/ReservationManagementDetail.component';
import ReservationCancelList from './pages/admin/reservation-cancel/ReservationCancelList.page';
import { AdminContactPage } from './pages/admin/contact/AdminContact.page';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ToastContainer } from 'react-toastify';
import { WebSocketProvider } from './components/websocket/contexts/WebSocket.provider';
import { classNames } from './utils';
import './App.scss';
import {
  APP_THEME_OPTIONS,
  useAppTheme,
} from './hooks/use-app-theme/appTheme.constant';
import { loginStateStore } from './states/login/loginStore';
import UserInterceptor from './pages/login/loginInterCepter/adminInterceptor/AdminIntercetor.component';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // refetchOnWindowFocus: false, // 기본값이 true. true일 경우 브라우저 화면이 포커스 되었을 경우 데이터를 갱신한다
    },
  },
});

function App() {
  // 로그인 정보 확인 후 사용자/관리자 처리 용 상태
  const [isAdmin, setIsAdmin] = useState(() => false);
  const { selectedTheme, onSelectTheme } = useAppTheme();
  const { loginInfo, resetLoginedStateStore } = loginStateStore();

  useEffect(() => {
    if (!sessionStorage.getItem('Logged')) {
      localStorage.removeItem('userInfo');
    }
  }, []);

  // useEffect(() => {
  // 	if (sessionStorage.getItem('Logined')) {
  // 		console.log(loginInfo);
  // 	}
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <div className={classNames('app__container', selectedTheme.value)}>
        {loginInfo.memType !== 'admin' ? (
          <Select
            className='app__selector'
            defaultOption={selectedTheme}
            optionList={APP_THEME_OPTIONS}
            onSelect={onSelectTheme}
          />
        ) : (
          ''
        )}

        <ToastContainer />

        {/* TODO: 사용자 페이지, 관리자 페이지 헤더 분리 */}
        {loginInfo.memType !== 'admin' ? <AppHeader /> : ''}
        {/* <AppHeader /> */}
        <Routes>
          <Route
            path='/test'
            element={<TestPage />}
          />
          {/* path member로 변경 */}
          {/* 복수형으로  */}

          {
            <Route
              path='/users'
              element={
                <LoginInterceptor>
                  <UserPage />
                </LoginInterceptor>
              }
            >
              {USER_ROUTE.map((route, idx) => {
                return (
                  <Route
                    key={idx}
                    index={route.index}
                    path={route.path}
                    element={<route.element className={route.className} />}
                  />
                );
              })}
            </Route>
          }
          <Route
            path='/diary'
            element={
              <LoginInterceptor>
                <DiaryPage />
              </LoginInterceptor>
            }
          />
          {/* 로그인 부분 */}
          <Route
            path='/login'
            element={<LoginPage />}
          ></Route>
          <Route
            path='/auth/callback/'
            element={<LoginPage />}
          ></Route>
          {/* 회원가입 */}
          <Route
            path='/register'
            element={<Register />}
          />
          {/* 비밀번호 재설정 */}
          <Route
            path='/resetting'
            element={<PwdResetting />}
          />

          {/* 채팅 */}
          <Route path='/chat'>
            <Route
              index
              element={<Chat />}
            />
            <Route
              path='/chat/room'
              element={
                <WebSocketProvider>
                  <ChatRoom />
                </WebSocketProvider>
              }
            />
          </Route>
          <Route
            index
            element={<Main />}
          />
          <Route
            path='/carts'
            element={
              <LoginInterceptor>
                <CartMain />
              </LoginInterceptor>
            }
          />
          <Route
            path='/guest/reservations'
            element={<NonMemberReservation />}
          />
          <Route path='/accommodations'>
            {/* 숙박 목록 페이지 */}
            <Route
              index
              element={<AccommodationList />}
            />
            {/* 숙박 상세 페이지 */}
            <Route
              path='/accommodations/:id'
              element={<AccommodationDetail />}
            />
          </Route>
          <Route
            path='/reservations'
            element={<Reservation />}
          />
          <Route
            path='/orders/:id'
            element={<Receipt />}
          />
          {/* 관리자 라우팅 - 추후 AdminLayout 으로 한번 Layout을 잡고 Outlet 할 예정 */}
          <Route
            path='/admin'
            element={
              <UserInterceptor>
                <AdminLayout />
              </UserInterceptor>
            }
          >
            {/* 사용자 문의 */}
            <Route
              path='contact'
              element={<AdminContactPage />}
            />
            <Route path='accommodations'>
              <Route
                index
                element={<AdminMain />}
              />
              {/* 숙박등록/수정페이지 */}
              <Route
                path='new'
                element={<AccommodationFormContainer />}
              />
              <Route
                path=':id/edit'
                element={<AccommodationFormContainer />}
              />
              {/* 객실등록/수정페이지 */}
              <Route
                path=':id/rooms'
                element={<RoomMain />}
              />
              <Route
                path=':id/rooms/:roomSq'
                element={<RoomMain />}
              />
            </Route>
            <Route path='reservations'>
              <Route
                index
                element={<ReservationManagementList />}
              />
              <Route
                path=':id/detail'
                element={<ReservationManagementDetail />}
              />
            </Route>
            <Route
              path='cancel-reservations'
              element={<ReservationCancelList />}
            />
          </Route>
          <Route
            path='/chat/room'
            element={<ChatRoom />}
          />
        </Routes>
        {/* TODO: 관리자인 경우 사용자 푸터 제거 */}
        {!isAdmin && <AppFooter />}
      </div>
      {/* <ReactQueryDevtools /> */}
    </QueryClientProvider>
  );
}

export default App;
