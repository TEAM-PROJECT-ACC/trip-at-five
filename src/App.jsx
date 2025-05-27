import { Route, Routes } from 'react-router-dom';
import { DiaryPage, TestPage, UserPage } from './pages';
import { AppFooter, AppHeader } from './components';
import { USER_ROUTE } from './pages/user/constants/routes-path/userRoute.constant';
import './App.css';
import SignUp from './pages/sign/SignUp';
import LoginPage from './pages/login/Login';
import PwdRestting from './pages/login/pwd-resetting/Login.password.resetting.conponent';
import { Chat } from './pages/chat/Chat.main.conponent';
import ChatRoom from './pages/chat/room/Chat.room.conponent';


function App() {
	return (
		<>
			<AppHeader />

			<Routes>
				<Route
					path='/test'
					element={<TestPage />}
				/>
				<Route
					path='/user'
					element={<UserPage />}
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
        <Route
          path='/diary'
          element={<DiaryPage />}
        />
				{/* 로그인 부분 */}
				<Route
					path='/login'
					element={<LoginPage />}
				></Route>

				{/* 회원가입 */}
				<Route
					path='/signUp'
					element={<SignUp />}
				/>

				{/* 비밀번호 재설정 */}
				<Route
					path='/resetting'
					element={<PwdRestting />}
				/>

				{/* 채팅 */}
				<Route
					path='/chat'
					element={<Chat />}
				/>

				<Route
					path='/chat/room'
					element={<ChatRoom />}
				/>

			</Routes>
			<AppFooter />
		</>
	);
}

export default App;
