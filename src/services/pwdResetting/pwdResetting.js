import baseServrAxios from '../Interceptor/Interceptor';

export const updatePwd = async (email,pwd) => {
	const response = await baseServrAxios.put('/users/updatePwd', {
		email: email,
		pwd,
		pwd,
	});
	return response;
};
