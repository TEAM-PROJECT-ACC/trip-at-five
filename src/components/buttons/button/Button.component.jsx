import { classNames } from '../../../utils';
import './button.style.scss';

export const Button = ({ className, children, onClick, ...props }) => {
	return (
		<button
			className={classNames('global-button', className)}
			onClick={onClick}
			{...props}>
			{children}
		</button>
	);
};
