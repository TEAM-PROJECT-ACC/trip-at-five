import { useMemo } from 'react';
import { Outlet, useMatch } from 'react-router-dom';
import { PageContainer } from '../../components';
import { UserAside } from './components/aside/UserAside.component';
import { UserMainTitle } from './components/main-title/MainTitle.component';
import { getSubPageTitle } from './utils/index';
import './user.style.scss';
import { classNames } from '../../utils';

const CLASSNAME = 'user-page';

export const UserPage = () => {
  const match = useMatch('/user/:subPath');

  const pageTitle = useMemo(() => {
    const subPath = match ? match.params.subPath : '/';
    return getSubPageTitle(subPath);
  }, [match]);

  // /diary
  // /contact

  return (
    <PageContainer className={classNames('user-page__container', CLASSNAME)}>
      <UserMainTitle>{pageTitle}</UserMainTitle>
      <section className='user-page__contents-section'>
        <UserAside className={CLASSNAME} />
        <Outlet />
      </section>
    </PageContainer>
  );
};
