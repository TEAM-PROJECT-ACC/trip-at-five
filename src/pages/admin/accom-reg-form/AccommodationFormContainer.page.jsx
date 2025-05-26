import './AccommodationFormContainer.style.scss';
import AccommodationForm from './local-components/AccommodationForm.component';
import RoomList from './local-components/room-list/RoomList';

const AccommodationFormContainer = () => {
  return (
    <div className='accom-form__container'>
      <div className='accom-reg-date'>
        <span className='accom-date'>2025-05-11</span>
        <span>에 등록되었습니다.</span>
      </div>
      <AccommodationForm />
      <RoomList />
    </div>
  );
};

export default AccommodationFormContainer;
