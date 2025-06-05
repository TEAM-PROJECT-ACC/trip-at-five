import axios from 'axios';
import {
	VITE_KAKAO_REST_KEY,
	VITE_KAKAO_REDIRECT_URI,
} from '../../../env.config';
import { serverBaseURL } from '../../services/serverBaseURL';
const baseServerURL = serverBaseURL;

// 설정을 통해 axios 객체 생성
const kakaoAxios = axios.create({
	baseURL: 'https://kauth.kakao.com',
	withCredentials: true,
});

const baseServrAxios = axios.create({
	baseURL: baseServerURL,
	withCredentials: true,
});

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;

export const sendSnsCode = (code) => {
	const respone = axios
		.post(
			'https://kauth.kakao.com/oauth/token' +
				'?grant_type=authorization_code' +
				`&client_id=${VITE_KAKAO_REST_KEY}` +
				`&edirect_uri${VITE_KAKAO_REDIRECT_URI}` +
				`&code=${code}`,
			{
				headers: {
					'Content-Type':
						'Content-Type: application/x-www-form-urlencoded;charset=utf-8',
				},
			}
		)
		.then(async (respone) => {
			console.log(respone);
			await axios
				.get('https://kapi.kakao.com/v2/user/me', {
					headers: {
						Authorization: `Bearer ${respone.data.access_token}`,
					},
				})
				.then(async (respone) => {
					console.log(respone.data);

					const test = await baseServrAxios.post('/login/kakao', respone);
					return console.log(test.data);
				})
				.catch(() => {
					console.error('GET 유저 정보 요청 에러:', error);
				});
		})
		.catch((error) => {
			console.error('GET SNS 로그인 에러:', error);
		});
	return respone;
};
