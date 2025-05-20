import { FaUser } from 'react-icons/fa';
import { classNames } from '../../utils';
import './icons.style.scss';

export const FaUserIcon = ({ className }) => {
	return <FaUser className={classNames('fa-icon', className)} />;
};
