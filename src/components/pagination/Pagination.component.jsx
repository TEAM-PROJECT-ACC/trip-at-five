import { classNames } from '../../utils/index';
import './pagination.style.scss';

/**
 * 총 아이템 수
 * 페이지 단위
 *
 *
 * @param {*} param0
 * @returns
 */

export const Pagination = ({ className }) => {
	return (
		<span className={classNames('pagination__container', className)}></span>
	);
};
