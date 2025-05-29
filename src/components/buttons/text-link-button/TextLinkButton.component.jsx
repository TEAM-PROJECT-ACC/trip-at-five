import { Link } from 'react-router-dom';
import { classNames } from '../../../utils';
import './textLinkButton.style.scss';

export const TextLinkButton = ({ className, children, to, ...props }) => {
	return (
		<Link
			className={classNames('global-link__text-button', className)}
			to={to}
			{...props}>
			{children}
		</Link>
	);
};
