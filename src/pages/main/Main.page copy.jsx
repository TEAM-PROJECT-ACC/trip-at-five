import { useEffect } from 'react';
import MainArea from './local-components/MainArea.component';
import { useAccomSearchStore } from '../../states';
import { testServer } from '../../services/test/testServerAPI';
import './Main.style.scss';
import { useLocation } from 'react-router-dom';
import { LoginSnsStateStore } from '../login/login-store/loginStore';
import {
	VITE_KAKAO_REST_KEY,
	VITE_KAKAO_REDIRECT_URI,
} from '../../../env.config';
import { sendSnsCode } from '../login/loginUtil';

const MainTest = () => {
	const state = useAccomSearchStore((state) => state);

	const { code, setCode } = LoginSnsStateStore();

	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const searchTerm = queryParams.get('code');

  const data = {
     code: code
  };

useEffect(() => {
  if (searchTerm !== null) {
    setCode(searchTerm);
    console.log('code 1'+code)
    if(code !=null) {
    Test();
    }
  }
}, [code]);

   const Test = async() => {
      const result = await sendSnsCode(data);
      console.log('result test '+result);
   }


	const serverConnectionTest = async () => {
		// Server 연동 테스트
		const result = await testServer();
		console.log('result : ' + result);
	};

	useEffect(() => {
		serverConnectionTest();
	}, []);

	useEffect(() => {
		// 새로고침 할 경우 검색 상태 초기화
		state.resetState();
	}, []);

	return (
		<div className='main-page__container'>
      <button onClick={Test}>test</button>
			<MainArea />
		</div>
	);
};

export default MainTest;
