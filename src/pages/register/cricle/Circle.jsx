import { useRegisterStore } from '../RegisterStore';
import './circle.scss';

export default function Circle() {
  const { step } = useRegisterStore();

  const num = [1, 2, 3, 4, 5];

  const circleList = num.map((circleItem, index) => (
    <div
      key={index}
      className={`${
        step == circleItem ? 'register-circle-max' : 'register-circle-min'
      }`}
    />
  ));
  return (
    <>
      <div className='register-circle-wrap'>{circleList}</div>
    </>
  );
}
