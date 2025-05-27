import './RoomMain.style.scss';
import RoomRegForm from './local-components/RoomRegForm';
const RoomMain = () => {
  return (
    <div className='room-main__container'>
      <div className='room-main-header'>
        <h1>숙박업체명</h1>
      </div>
      <RoomRegForm />
    </div>
  );
};

export default RoomMain;
