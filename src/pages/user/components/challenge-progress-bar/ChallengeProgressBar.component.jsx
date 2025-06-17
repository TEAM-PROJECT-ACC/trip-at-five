import { useEffect } from 'react';
import { classNames } from '../../../../utils';
import './challengeProgressBar.style.scss';

export const ChallengeProgressBar = ({ chalCond, currentStep }) => {
	// TODO: condition, history 데이터 확인 후
	// after width 값 계산

	const division = Math.floor(chalCond / currentStep);
	const divisionRest = Math.floor(chalCond % currentStep);
	const result = division + divisionRest;

	const getBookStateClass = (state) => {
		switch (state) {
			case 1:
				return 'bar100';
			case 2:
				return 'bar60';
			case 3:
				return 'bar30';
			default:
				return '';
		}
	};

	return (
		<div
			className={classNames(
				'user-page',
				'challenge-progress-bar',
				getBookStateClass(result)
			)}
		></div>
	);
};
