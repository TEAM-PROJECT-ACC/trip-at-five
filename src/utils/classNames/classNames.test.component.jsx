import { useState } from 'react';
import { UtilsTestPageLayout } from '../test-page-layout/UtilsTest.component';
import { classNames } from './classNames.util';

export const ClassNamesTest = () => {
	const [classNameValue, setClassNameValue] = useState(() => '');

	const handleChangeClassNames = (event) => {
		const value = event.target.value;
		setClassNameValue(() => value);
	};

	return (
		<UtilsTestPageLayout testSubTitle={'classNames'}>
			<div className='test--page__test--area'>
				<input
					type='text'
					value={classNameValue}
					onChange={handleChangeClassNames}
				/>
				<div className={classNames('test--page__class--names', classNameValue)}>
					<h2>추가 된 클래스</h2>
					<div className='test--page__added--class'>{classNameValue}</div>
				</div>
			</div>
		</UtilsTestPageLayout>
	);
};
