import { classNames } from '../../../../../../utils/index';
import { MyPageSectionTitle } from '../section-title/SectionTitle.component';
import { FaFireAlt } from '../../../../../../assets/icons/index';
import { ChallengeProgressBar } from '../../../../components/challenge-progress-bar/ChallengeProgressBar.component';
import './challenge.style.scss';

export const ChallegeSection = ({ className }) => {
  return (
    <section
      className={classNames(
        className,
        'challenge__container',
        'my-page-section'
      )}
    >
      <MyPageSectionTitle
        className={classNames(className)}
        linkTo={'challenge'}
      >
        <FaFireAlt className='my-page__title-icon' />
        챌린지
      </MyPageSectionTitle>
      <div className='my-page__challenge-info'>
        {/* TODO: data 추가 */}
        {/* challenge name, condition */}
        숙박 3회 이용하기 (1/3)
      </div>
      <ChallengeProgressBar />
    </section>
  );
};
