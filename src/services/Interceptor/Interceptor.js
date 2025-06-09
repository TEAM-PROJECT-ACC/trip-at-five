import axios from 'axios';
import { serverBaseURL } from '../../services/serverBaseURL';
const baseServrAxios = axios.create({
	baseURL: serverBaseURL,
	withCredentials: true,
});

// 응답 인터셉터 설정
baseServrAxios.interceptors.response.use(
	function (response) {
		return response; // 정상 응답 반환
	},
	function (error) {
		console.log(error);

		if (error.response?.status === 401) {
			sessionStorage.removeItem('Logined');
			window.location.href = '/login';
			console.log('401 에러');
		}

		if (error.code !== 'ERR_CANCELED') {
			alert('문제가 발생했습니다.');
		}

		return Promise.reject(error);
	}
);

export default baseServrAxios;
