import { FaRegUser } from '../../../../../assets/icons/index';
import { TextLinkButton } from '../../../../../components';
import { loginStateStore } from '../../../../../states/login/loginStore';
import { classNames } from '../../../../../utils';
import './userProfile.style.scss';

const CLASSNAME = 'aside-user-profile';

export const UserProfile = ({ className }) => {
  const { loginInfo } = loginStateStore();
  return (
    <div className={classNames(className, `${CLASSNAME}__container`)}>
      <div className={`${CLASSNAME}__user-nickname`}>
        <TextLinkButton to={'/users'}>
          <FaRegUser className={`${CLASSNAME}__nickname-icon`} />
          {loginInfo.memNick}
        </TextLinkButton>
      </div>
      <div className={`${CLASSNAME}__user-email`}>{loginInfo.memEmailId}</div>
      <div className={`${CLASSNAME}__user-lv`}>LV.{loginInfo.memLvl}</div>
      {/* TODO: 경험치 바 추가 */}
    </div>
  );
};
