import { classNames } from '../../../../utils';
import { UserPageContainer } from '../../components/page-container/UserPageContainer.component';
import { BookHistory } from './components/book-history/BookHistory.component';
import { ChallegeSection } from './components/challenge/Challenge.component';
import './myPage.style.scss';

const CLASSNAME = 'my-page';

export const MyPage = ({ className }) => {
  return (
    <UserPageContainer
      className={classNames(className, `${CLASSNAME}__container`)}
    >
      <ChallegeSection className={className} />
      <BookHistory className={className} />
    </UserPageContainer>
  );
};
