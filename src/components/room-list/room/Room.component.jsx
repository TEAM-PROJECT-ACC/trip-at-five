import { useAccomSearchStore } from '../../../states';
import { GoCheckCircle, GoCheckCircleFill } from '../../../assets/icons/index';
import './Room.style.scss';

const Room = ({ className, checkArea, value, checkHandler, isChecked }) => {
  const { checkIn, checkOut, tripDay } = useAccomSearchStore((state) => state);

  const checkRoomHandler = () => {
    checkHandler(value);
  };

  return (
    <div className={className}>
      <div className='accom-name'>
        {checkArea && (
          <span onClick={checkRoomHandler}>
            {isChecked ? <GoCheckCircleFill /> : <GoCheckCircle />}
          </span>
        )}
        <h1>{value?.accomName}</h1>
      </div>
      <div className='room-body'>
        <div className='room-image'>
          <img src='/assets/images/room-page/sample.png' />
        </div>
        <div className='room-info'>
          <h2>{value?.roomName}</h2>
          <p>
            {checkIn} ~ {checkOut} ({tripDay}박)
          </p>
          <p className='room-price'>
            <span>{value?.roomPrice.toLocaleString('ko-KR')}</span>원
          </p>
        </div>
      </div>
    </div>
  );
};

export default Room;
