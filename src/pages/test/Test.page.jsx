import {
	InputPrimary,
	InputSecondary,
	InputShrink,
} from '../../components/inputs';
import { ClassNamesTest } from '../../utils';
import './test.style.scss';

export const TestPage = () => {
	return (
		<div className='test-page__container'>
			<ClassNamesTest />
			<section className='test-page__section'>
				<h1>전역 (공용) 컴포넌트 확인</h1>
				<h3>input component</h3>
				<div className='test-page__test-area'>
					<InputPrimary />
					<InputSecondary />
					<InputShrink labelText={'라벨'} />
				</div>
			</section>
		</div>
	);
};

//test-page__section
