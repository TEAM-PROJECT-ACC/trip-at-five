import { useState } from 'react';
import { UtilsTestPageLayout } from '../test-page-layout/UtilsTest.component';
import { classNames } from './classNames.util';
import { InputPrimary } from '../../components/inputs';

export const ClassNamesTest = () => {
	const [classNameValue, setClassNameValue] = useState(() => '');

	const handleChangeClassNames = (event) => {
		const value = event.target.value;
		setClassNameValue(() => value);
	};

	return (
		<UtilsTestPageLayout testSubTitle={'classNames'}>
			<div className='test-page__test-area'>
				<InputPrimary
					type='text'
					value={classNameValue}
					onChange={handleChangeClassNames}
				/>
				<div className={classNames('test-page__class-names', classNameValue)}>
					<h3>추가 된 클래스</h3>
					<div className='test-page__added-class'>{classNameValue}</div>
				</div>
			</div>
		</UtilsTestPageLayout>
	);
};
