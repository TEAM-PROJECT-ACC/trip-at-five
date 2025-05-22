import { Route, Routes } from 'react-router-dom';
import { TestPage } from './pages/test/Test.page';
import { AppFooter, AppHeader } from './components';
import './App.css';
import Login from './pages/login/Login';

function App() {
	// TODO : 규형님 로그인 상태 확인
	// 1. 비로그인 시 리디렉트 로그인 페이지로
	// 2. 로그인 회원 상태 관리가 zustand 전역 상태 관리로
	// 전역 상태 관리 초기화 (jwt access token, refresh token) 둘 다 없으면 1번 처리
	// 로그아웃 할 때 회원 상태 초기화

	return (
<<<<<<< HEAD
    
		<Routes>
			<Route
				path='/test'
				element={<TestPage />}
			/>
			{/*
        // TODO: 회원 팀
        로그인/회원가입
        
        마이페이지(index)
          내 정보
          내 쿠폰
          내 예약
          챌린지
        
        비회원 예약
        장바구니
        나의 일지
        채팅페이지(index)
        문의
        채팅
        
        // TODO: 숙박 팀
        메인
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
		</Routes>


=======
		<>
			<AppHeader />
			<Routes>
				<Route
					path='/test'
					element={<TestPage />}
				/>
				{/*
          // TODO: 회원 팀
          로그인/회원가입
          
          마이페이지(index)
            내 정보
            내 쿠폰
            내 예약
            챌린지
          
          비회원 예약
          장바구니
          나의 일지
          채팅페이지(index)
          문의
          채팅
          
          // TODO: 숙박 팀
          메인
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
			</Routes>
			<AppFooter />
		</>
>>>>>>> 90b9ebb727e4b488d3ebd514940526a565a69d4e
	);
}

export default App;
