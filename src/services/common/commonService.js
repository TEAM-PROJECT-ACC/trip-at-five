import baseServrAxios from '../Interceptor/Interceptor';

export const emailDuplicationCheck = async (email) => {
	const response = await baseServrAxios.post('/email/emailDuplication', {
		email: email,
	});
	return response;
};

export const sendEmailCode = async (email) => {
	const response = await baseServrAxios.post('/email/send', { email: email });
	return response;
};

export const emailCodeCheck = async (email, code) => {
	const response = await baseServrAxios.post('/email/verify', {
		email: email,
		code: code,
	});
	return response;
};
