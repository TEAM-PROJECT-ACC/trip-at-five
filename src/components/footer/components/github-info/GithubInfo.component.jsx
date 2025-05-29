import { FaGithub } from '../../../../assets/icons/index';
import './githubInfo.style.scss';

export const GithubInfo = ({ children }) => {
	return <div className='global-footer__github-info'>{children}</div>;
};

export const MemberName = ({ children }) => {
	return <span className='global-footer__member-name'>{children}</span>;
};

export const GithubLink = ({ children, to }) => {
	return (
		<span className='global-footer__github-link'>
			<FaGithub className='global-footer__github-link-icon' />
			<a
				className='global-footer__github-link'
				href={to}
				target='_blank'>
				{children}
			</a>
		</span>
	);
};
