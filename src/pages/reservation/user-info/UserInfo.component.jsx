import ReservationPerson from './reservation-person/ReservationPerson.component';
import EmailForm from './email-form/EmailForm.component';
import './UserInfo.style.scss';

const UserInfo = ({ className }) => {
  return (
    <div className={className}>
      <EmailForm className='email-form-area__container' />
      <ReservationPerson className='reservation-person-info-form-area__container' />
    </div>
  );
};

export default UserInfo;
