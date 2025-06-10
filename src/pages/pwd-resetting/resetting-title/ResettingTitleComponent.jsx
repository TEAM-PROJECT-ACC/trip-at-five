import { classNames } from '../../../utils';
import './resettingTitleStyle.scss';

export function ResttingTitle({ className, text }) {
	return <p className={classNames(className)}>{text}</p>;
}
