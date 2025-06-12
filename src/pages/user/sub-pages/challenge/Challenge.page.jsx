import { useEffect, useState } from 'react';
import { challengeSelect } from '../../../../services/user/userService';
import { UserPageContainer } from '../../components/page-container/UserPageContainer.component';
import './challenge.style.scss';
import { ChallengeItem } from './components/challenge-item/ChallengeItem.component';
import { loginStateStore } from '../../../../states/login/loginStore';

// const dummyData = [
// 	{
// 		chalSq: 1,
// 		chalName: '첫 예약 완료',
// 		chalCond: 1,
// 		currentStep: 1,
// 		rewardCouponName: '웰컴 할인 쿠폰',
// 	},
// 	{
// 		chalSq: 2,
// 		chalName: '3일 이상 숙박',
// 		chalCond: 3,
// 		currentStep: 2,
// 		rewardCouponName: '장기숙박 할인 쿠폰',
// 	},
// 	{
// 		chalSq: 3,
// 		chalName: '후기 1회 작성',
// 		chalCond: 1,
// 		currentStep: 1,
// 		rewardCouponName: '감사 쿠폰 5천원',
// 	},
// 	{
// 		chalSq: 4,
// 		chalName: '후기 3회 작성',
// 		chalCond: 3,
// 		currentStep: 1,
// 		rewardCouponName: '후기왕 쿠폰 1만원',
// 	},
// 	{
// 		chalSq: 5,
// 		chalName: '후기 5회 작성',
// 		chalCond: 5,
// 		currentStep: 3,
// 		rewardCouponName: '프리미엄 후기 쿠폰',
// 	},
// 	{
// 		chalSq: 6,
// 		chalName: 'SNS 공유 1회',
// 		chalCond: 1,
// 		currentStep: 0,
// 		rewardCouponName: 'SNS 감사 쿠폰',
// 	},
// 	{
// 		chalSq: 7,
// 		chalName: 'SNS 공유 5회',
// 		chalCond: 5,
// 		currentStep: 2,
// 		rewardCouponName: 'SNS 홍보왕 쿠폰',
// 	},
// 	{
// 		chalSq: 8,
// 		chalName: '1주일 연속 숙박',
// 		chalCond: 7,
// 		currentStep: 4,
// 		rewardCouponName: '연박 스페셜 쿠폰',
// 	},
	// {
	//   chalSq: 9,
	//   chalName: '5회 이상 예약',
	//   chalCond: 5,
	//   currentStep: 5,
	//   rewardCouponName: '단골 할인 쿠폰',
	// },
	// {
	//   chalSq: 10,
	//   chalName: '10회 이상 예약',
	//   chalCond: 10,
	//   currentStep: 7,
	//   rewardCouponName: 'VIP 예약 쿠폰',
	// },
	// {
	//   chalSq: 11,
	//   chalName: '단골 숙소 3회 방문',
	//   chalCond: 3,
	//   currentStep: 1,
	//   rewardCouponName: '숙소 단골 쿠폰',
	// },
	// {
	//   chalSq: 12,
	//   chalName: '특가 이용 2회',
	//   chalCond: 2,
	//   currentStep: 2,
	//   rewardCouponName: '특가 감사 쿠폰',
	// },
	// {
	//   chalSq: 13,
	//   chalName: '모바일 앱 예약 3회',
	//   chalCond: 3,
	//   currentStep: 2,
	//   rewardCouponName: '앱 전용 할인 쿠폰',
	// },
	// {
	//   chalSq: 14,
	//   chalName: '쿠폰 사용 5회',
	//   chalCond: 5,
	//   currentStep: 3,
	//   rewardCouponName: '쿠폰 마스터 쿠폰',
	// },
	// {
	//   chalSq: 15,
	//   chalName: '친구 초대 3명',
	//   chalCond: 3,
	//   currentStep: 1,
	//   rewardCouponName: '친구 초대 쿠폰',
	// },
	// {
	//   chalSq: 16,
	//   chalName: '챌린지 5개 달성',
	//   chalCond: 5,
	//   currentStep: 4,
	//   rewardCouponName: '챌린지 도전자 쿠폰',
	// },
	// {
	//   chalSq: 17,
	//   chalName: '생일 주간 예약',
	//   chalCond: 1,
	//   currentStep: 0,
	//   rewardCouponName: '생일 축하 쿠폰',
	// },
	// {
	//   chalSq: 18,
	//   chalName: '명절 주간 예약',
	//   chalCond: 1,
	//   currentStep: 1,
	//   rewardCouponName: '명절 특별 쿠폰',
	// },
	// {
	//   chalSq: 19,
	//   chalName: '리뷰 사진 업로드 3회',
	//   chalCond: 3,
	//   currentStep: 3,
	//   rewardCouponName: '포토리뷰 쿠폰',
	// },
	// {
	//   chalSq: 20,
	//   chalName: '10박 누적 숙박',
	//   chalCond: 10,
	//   currentStep: 6,
	//   rewardCouponName: '누적 숙박 혜택 쿠폰',
	// },
// ];

export const ChallengePage = () => {
	const [list, setList] = useState([]);
	const { loginInfo } = loginStateStore();

	useEffect(() => {
		const fetchData = async () => {
			const result = await challengeSelect(loginInfo.memSq);
			if (result.status === 200) {
				setList(result.data); // result.data가 배열이어야 함
				console.log(result);
			}
		};
		fetchData();
	}, []);

	return (
		<UserPageContainer className='user-page challenge__container'>
			{/* TODO: challenge list map으로 변경해야 함 */}
			{list.map((challenge, idx) => {
				return (
					<ChallengeItem
						key={idx}
						challenge={challenge}
					/>
				);
			})}
		</UserPageContainer>
	);
};
