import axios from 'axios';
import { serverBaseURL } from '../serverBaseURL';
const baseURL = serverBaseURL;

const apiAxios = axios.create({
	baseURL: baseURL,
	withCredentials: true,
});

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


export const nickNameDuplicationCheck = async (nick) => {
	const response = await apiAxios.post('/register/nickNameDuplicationCheck', {
		nick: nick
	});
	return response.data;
};
