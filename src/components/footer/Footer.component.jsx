import { classNames } from '../../utils';
import { Logo } from './components/logo/Logo.component';
import { ProjectGithub } from './components/project-github/ProjectGithub.component';
import { TeamGithub } from './components/team-github/TeamGithub.component';
import './footer.style.scss';

export const AppFooter = () => {
	return (
		<footer className={classNames('global-footer__container')}>
			<div className='global-footer__inner'>
				<Logo />
				<div className='global-footer__info'>
					<TeamGithub />
					<ProjectGithub />
				</div>
			</div>
		</footer>
	);
};
