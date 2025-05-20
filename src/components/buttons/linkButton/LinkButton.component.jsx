import { Link } from 'react-router-dom';
import './linkButton.style.scss';
import { classNames } from '../../../utils';

export const LinkButton = ({ className, children, to, ...props }) => {
	return (
		<Link
			className={classNames('global-link-button', className)}
			to={to}
			{...props}>
			{children}
		</Link>
	);
};
