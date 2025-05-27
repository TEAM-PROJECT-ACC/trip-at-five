import { classNames } from '../../../../utils';
import './challengeProgressBar.style.scss';

export const ChallengeProgressBar = ({ chalCond, currentStep }) => {
  // TODO: condition, history 데이터 확인 후
  // after width 값 계산
  return (
    <div className={classNames('user-page', 'challenge-progress-bar')}></div>
  );
};
