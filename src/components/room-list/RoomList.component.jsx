import Room from './room/Room.component';
import './RoomList.style.scss';

const RoomList = ({ className }) => {
  return (
    <div className={className}>
      <Room className='room-item' />
      <Room className='room-item' />
      <Room className='room-item' />
    </div>
  );
};

export default RoomList;
