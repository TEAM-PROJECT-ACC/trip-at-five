import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';
const baseURL = serverBaseURL;

const apiAxios = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

// 통신 오류 발생 시 처리
apiAxios.interceptors.response.use(
	function (response) {
		// 2xx 범위의 코드 시 현재 함수를 실행.
		return response; // 응답 결과 전달
	},
	function (error) {
		console.log(error);

		if (error.status === 401) {
			// sessionStorage "logined" 값을 제거
			sessionStorage.removeItem('logined');
			location.href = '/';
		}
		// 2xx 외의 범위의 코드 시 현재 함수를 실행.
		if (error.code !== 'ERR_CANCELED') errorAlert('문제가 발생했습니다.');
		return Promise.reject(error); // 응답 오류가 있는 작업 수행
	}
);

export const emailDuplicationCheck = async (email) => {
	const response = await apiAxios.post('/register/emailDuplication', {
		email: email,
	});
	return response.data;
};

export const sendEmailCode = async (email) => {
	const response = await apiAxios.post('/email/send', { email: email });
	return response.data;
};

export const EmailCodeCheck = async (email, code) => {
	const response = await apiAxios.post('/email/verify', {
		email: email,
		code: code,
	});
	return response.data;
};

export const nickNameDuplicationCheck = async (nickName) => {
	const response = await apiAxios.post('/register/nickNameDuplicationCheck', {
		nickName: nickName,
	});
	return response;
};

export const sendRegister = async (email, pwd, nickName, tel, address) => {
	const response = await apiAxios.post('/register/send', {
		email: email,
		pwd: pwd,
		nickName: nickName,
		tel: tel,
		address: address,
	});
	return response.data;
};
