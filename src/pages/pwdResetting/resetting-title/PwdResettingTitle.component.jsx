import { classNames } from '../../../utils';
import './pwdResettingTitle.style.scss';

export function ResettingTitle({ className, text }) {
	return <p className={classNames(className)}>{text}</p>;
}
