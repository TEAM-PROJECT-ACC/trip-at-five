import { TextLinkButton } from '../../../../../../components';
import { classNames } from '../../../../../../utils';
import './sectionTitle.style.scss';

export const MyPageSectionTitle = ({ children, className, linkTo }) => {
  return (
    <div className={classNames(className, 'section-title__container')}>
      <div className='section-title'>{children}</div>
      <TextLinkButton
        className='section-title__link'
        to={linkTo}
      >
        더 보기
      </TextLinkButton>
    </div>
  );
};
