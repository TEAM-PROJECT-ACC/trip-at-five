import { ChallengeProgressBar } from '../../../../components/challenge-progress-bar/ChallengeProgressBar.component';
import { FaFireAlt } from '../../../../../../assets/icons/index';
import './challengeItem.style.scss';
import { ButtonPrimary } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import { challengeSuccess } from '../../../../../../services/user/userService';
import { loginStateStore } from '../../../../../../states/login/loginStore';
import { useState } from 'react';
import { successAlert } from '../../../../../../utils/toastUtils/toastUtils';

export const ChallengeItem = ({ onRefresh, challenge }) => {
	const {
		chalName,
		chalCond,
		currentStep,
		rewardCouponName,
		chalHistoryNo,
		ckCouponSt,
	} = challenge;
	const { loginInfo } = loginStateStore();
	const [isGet, setIsGet] = useState(false);
	const isDone = chalCond === currentStep;

	const challengeSuccessBtn = async () => {
		const result = await challengeSuccess(loginInfo.memSq, chalHistoryNo);
		if (result.status === 200) {
			successAlert('쿠폰을 흭득했습니다.');
			onRefresh();
			setIsGet();
		}
	};

	return (
		<div className='user-page challenge-item__container'>
			{/* 달성 시 획득 쿠폰 명 */}
			<div className='challenge-item__coupon-name-container'>
				<div className='challenge-item__coupon-name'>
					<FaFireAlt className='challenge-item__coupon-icon' />
					{rewardCouponName}
				</div>
				{/* TODO: 달성한 챌린지에 대해서 쿠폰 획득 버튼 필요 */}
				{/* 쿠폰 획득 여부 확인 */}
				<ButtonPrimary
					className={classNames(
						'challenge-item__coupon-button',
						// !isDone ? 'disabled' : ''
						ckCouponSt != null ? 'disabled' : !isDone || isGet ? 'disabled' : ''
					)}
					onClick={challengeSuccessBtn}
					disabled={ckCouponSt != null ? true : !isDone || isGet}
				>
					혜택 받기
				</ButtonPrimary>
			</div>
			{/* 챌린지 명 */}
			<div className='challenge-item__challenge-name'>{chalName}</div>
			<div className='challenge-item__challenge-progress'>
				{currentStep} / {chalCond}
			</div>
			{/* progress bar */}
			<ChallengeProgressBar
				chalCond={chalCond}
				currentStep={currentStep}
				className='challenge-item__challenge-progress-bar'
			/>
		</div>
	);
};
