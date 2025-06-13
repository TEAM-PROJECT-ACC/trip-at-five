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
		}

		if (error.code !== 'ERR_CANCELED') {
			alert('다시 로그인해 주시기 바랍니다.');
		}

		return Promise.reject(error);
	}
);

export default baseServrAxios;
