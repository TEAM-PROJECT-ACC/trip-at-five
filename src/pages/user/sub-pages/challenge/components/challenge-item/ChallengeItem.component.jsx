import { ChallengeProgressBar } from '../../../../components/challenge-progress-bar/ChallengeProgressBar.component';
import { FaFireAlt } from '../../../../../../assets/icons/index';
import './challengeItem.style.scss';
import { ButtonPrimary } from '../../../../../../components';
import { classNames } from '../../../../../../utils';

export const ChallengeItem = ({ challenge }) => {
  const { chalName, chalCond, currentStep, rewardCouponName } = challenge;
  const isDone = chalCond === currentStep;

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
            !isDone ? 'disabled' : ''
          )}
          disabled
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
      <ChallengeProgressBar className='challenge-item__challenge-progress-bar' />
    </div>
  );
};
