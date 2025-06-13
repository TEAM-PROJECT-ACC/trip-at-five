import { classNames } from '../../../utils';
import './pwdResettingTitle.style.scss';

export function ResttingTitle({ className, text }) {
	return <p className={classNames(className)}>{text}</p>;
}
