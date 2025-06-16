import ReservationPerson from './reservation-person/ReservationPerson.component';
import EmailForm from './email-form/EmailForm.component';
import './UserInfo.style.scss';
import { loginStateStore } from '../../../states/login/loginStore';

const UserInfo = ({ className }) => {
  const memEmail = loginStateStore((state) => state.loginInfo.memEmailId);

  return (
    <div className={className}>
      <EmailForm
        className='email-form-area__container'
        memEmail={memEmail}
      />
      <ReservationPerson className='reservation-person-info-form-area__container' />
    </div>
  );
};

export default UserInfo;
