import { classNames } from '../../../../utils';
import './resetting.title.conponent.scss';

export function ResttingTitle({ className, text }) {
	return <p className={classNames(className)}>{text}</p>;
	
}
