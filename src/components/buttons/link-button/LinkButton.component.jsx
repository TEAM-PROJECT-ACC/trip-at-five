import { Link } from 'react-router-dom';
import { classNames } from '../../../utils';
import './linkButton.style.scss';

export const LinkButton = ({ className, children, to, ...props }) => {
	return (
		<Link
			className={classNames('global-link__button', className)}
			to={to}
			{...props}>
			{children}
		</Link>
	);
};
