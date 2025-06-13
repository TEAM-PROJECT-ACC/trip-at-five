import axios from 'axios';
import {
	VITE_KAKAO_REST_KEY,
	VITE_KAKAO_REDIRECT_URI,
	VITE_NAVER_CLIENT_ID,
	VITE_NAVER_CLIENT_SECRET,
	VITE_NAVER_REDIRECT_URI,
	VITE_GOOGLE_REST_KEY,
	VITE_GOOGLE_CLIENT_ID,
	VITE_GOOGLE_CLIENT_SECRET,
	VITE_GOOGLE_REDIRECT_URI,
} from '../../../env.config';
import baseServrAxios from '../Interceptor/Interceptor';

export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${VITE_KAKAO_REST_KEY}&redirect_uri=${VITE_KAKAO_REDIRECT_URI}&response_type=code`;
export const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?client_id=${VITE_NAVER_CLIENT_ID}&redirect_uri=${VITE_NAVER_REDIRECT_URI}&response_type=code`;
export const GOOGLE_AUTH_URL = `https://accounts.google.com/o/oauth2/v2/auth?scope=openid email profile&client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code`;
export const postCodeUrl =
	'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

export const kakaoLogin = (code) => {
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
			const kakakoGet = await axios
				.get('https://kapi.kakao.com/v2/user/me', {
					headers: {
						Authorization: `Bearer ${respone.data.access_token}`,
					},
				})
				.then(async (respone) => {
					const kakaoresult = await baseServrAxios.post(
						'/login/kakao',
						respone
					);

					return kakaoresult;
				})
				.catch(() => {
					console.error('GET 유저 정보 요청 에러:', error);
				});
			return kakakoGet;
		})
		.catch((error) => {
			console.error('GET SNS 로그인 에러:', error);
		});
	return respone;
};

export const naverLogin = async (code) => {
	const respone = await axios
		.post(
			'/oauth2.0/token' +
				'?grant_type=authorization_code' +
				`&client_id=${VITE_NAVER_CLIENT_ID}` +
				`&client_secret=${VITE_NAVER_CLIENT_SECRET}` +
				`&code=${code}`
		)
		.then(async (respone) => {
			const responeGet = await axios
				.get('/v1/nid/me', {
					headers: {
						'content-type': 'application/json',
						Authorization: `Bearer ${respone.data.access_token}`,
					},
				})
				.then(async (respone) => {
					const naverResult = await baseServrAxios.post(
						'/login/naver',
						respone
					);

					return naverResult;
				})
				.catch(() => {
					console.log('정보요청실패');
				});
			return responeGet;
		})
		.catch();
	return respone;
};

export const googleLogin = async (code) => {
	const respone = await axios
		.post(
			'https://oauth2.googleapis.com/token' +
				`?client_id=${VITE_GOOGLE_CLIENT_ID}` +
				`&client_secret=${VITE_GOOGLE_CLIENT_SECRET}` +
				`&code=${code}` +
				`&grant_type=authorization_code` +
				`&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}`
		)
		.then(async (respone) => {
			const googleGet = await axios
				.get(`https://www.googleapis.com/oauth2/v3/userinfo`, {
					headers: {
						Authorization: `Bearer ${respone.data.access_token}`,
					},
				})
				.then(async (respone) => {
					const googleResult = await baseServrAxios.post(
						'/login/google',
						respone
					);
					return googleResult;
				});
			return googleGet;
		});
	return respone;
};

export const nomalLogin = async (id, pwd) => {
	const respone = await baseServrAxios.post('/login/nomal', {
		email: id,
		pwd: pwd,
	});
	return respone;
};

export const adminlLogin = async (id, pwd) => {
	const respone = await baseServrAxios.post('/login/admin', {
		email: id,
		pwd: pwd,
	});
	return respone;
};

export const logout = async () => {
	const respone = await baseServrAxios.get('/login/logout');
	if (respone.data === 'ok') {
		sessionStorage.removeItem('Logined');
		localStorage.removeItem('userInfo');
	}
	return respone;
};
