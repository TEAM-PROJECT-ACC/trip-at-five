import baseServrAxios from '../Interceptor/Interceptor';

export const userInfoUpdate = async (userUpdateTest) => {
	const respone = await baseServrAxios.put('/users/infoUpdate', userUpdateTest);
	return respone;
};

export const userInactive = async (userInfo) => {
	const respone = await baseServrAxios.put('/users/userInactive', {
		email: userInfo,
	});
	return respone;
};
