import { classNames } from '../../../utils';
import { Button } from '../index';
import './buttonSecondary.style.scss';

export const ButtonSecondary = ({ className, children, onClick, ...props }) => {
	return (
		<Button
			className={classNames('global-button__secondary', className)}
			onClick={onClick}
			{...props}>
			{children}
		</Button>
	);
};
