import { FaRegUser } from '../../../../../assets/icons/index';
import { TextLinkButton } from '../../../../../components';
import { classNames } from '../../../../../utils';
import './userProfile.style.scss';

const CLASSNAME = 'aside-user-profile';

export const UserProfile = ({ className }) => {
  return (
    <div className={classNames(className, `${CLASSNAME}__container`)}>
      <div className={`${CLASSNAME}__user-nickname`}>
        <TextLinkButton to={'/user'}>
          <FaRegUser className={`${CLASSNAME}__nickname-icon`} />
          여행다섯시
        </TextLinkButton>
      </div>
      <div className={`${CLASSNAME}__user-email`}>front-end@trip.o.clock</div>
      <div className={`${CLASSNAME}__user-lv`}>LV.100</div>
      {/* TODO: 경험치 바 추가 */}
    </div>
  );
};
