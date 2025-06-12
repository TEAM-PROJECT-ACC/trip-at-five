import baseServrAxios from '../Interceptor/Interceptor';

/* 회원 정보 수정 */
export const userInfoUpdate = async (userUpdateTest) => {
	const respone = await baseServrAxios.put('/users/infoUpdate', userUpdateTest);
	return respone;
};

/* 회원 비활성화 */
export const userInactive = async (userInfo, pwd) => {
	const respone = await baseServrAxios.put('/users/userInactive', {
		email: userInfo,
		pwd: pwd,
	});
	return respone;
};

/* 회원 챌린지 정보 조회 */
export const challengeSelect = async (userMemSq) => {
	const respone = await baseServrAxios.get(
		`/users/challenge?userMemSq=${userMemSq}`
	);
	return respone;
};

/* 회원 챌린지 완료 수정 */
export const challengeSucces = async (memSq, chalHistoryNo) => {
	const respone = await baseServrAxios.put(`/users/challengeSucces`, {
		memSq: memSq,
		chalHistoryNo: chalHistoryNo,
	});
	return respone;
};


/* 회원 쿠폰 정보 조회 */
export const couponSelect = async (userMemSq) => {
	const respone = await baseServrAxios.get(
		`/users/couponSelect?userMemSq=${userMemSq}`
	);
	return respone;
};