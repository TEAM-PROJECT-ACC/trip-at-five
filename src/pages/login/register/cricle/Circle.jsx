import { useRegisterStore } from '../RegisterStore';
import './circle.scss';

export default function Circle() {
	const { step } = useRegisterStore();

	return (
		<>
			<div className='register-circle-wrap'>
				<div
					className={`${step == 1 ? 'register-circle-max' : 'register-circle-min'}`}
				/>
				<div
					className={`${step == 2 ? 'register-circle-max' : 'register-circle-min'}`}
				/>
				<div
					className={`${step == 3 ? 'register-circle-max' : 'register-circle-min'}`}
				/>
				<div
					className={`${step == 4 ? 'register-circle-max' : 'register-circle-min'}`}
				/>
				<div
					className={`${step == 5 ? 'register-circle-max' : 'register-circle-min'}`}
				/>
			</div>
		</>
	);
}
