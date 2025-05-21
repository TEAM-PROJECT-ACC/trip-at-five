import { classNames } from '../../utils';
import './label.style.scss';

export const Label = ({ className, children }) => {
	return (
		<span className={classNames('global-label', className)}>{children}</span>
	);
};
