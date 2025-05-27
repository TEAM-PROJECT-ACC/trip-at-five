import axios from 'axios';
import {
	VITE_KAKAO_REST_KEY,
	VITE_KAKAO_REDIRECT_URI,
} from '../../../env.config';

// 설정을 통해 axios 객체 생성
const apiAxios = axios.create({
	baseURL: 'https://kauth.kakao.com',
	withCredentials: true, // 쿠키 또는 인증 헤더를 포함하여 요청할 것인지에 대한 설정
});

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;

export const sendEmail = async () => {
	const respone = await axios.post('.oauth/token');
	return respone.data;
};
