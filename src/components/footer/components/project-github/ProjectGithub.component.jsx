import { GithubInfo, GithubLink } from '../github-info/GithubInfo.component';
import './projectGithub.style.scss';

export const ProjectGithub = () => {
	return (
		<section className='global-footer__team-github'>
			<div className='global-footer__team-github-title'>
				TEAM PROJECT GITHUB
			</div>
			<div className='global-footer__team-github-container'>
				<GithubInfo>
					<GithubLink
						to={'https://github.com/TEAM-PROJECT-ACC/trip-at-five-client'}>
						@Front-end Repository
					</GithubLink>
				</GithubInfo>
				<GithubInfo>
					<GithubLink
						to={'https://github.com/TEAM-PROJECT-ACC/trip-at-five-server'}>
						@Back-end Repository
					</GithubLink>
				</GithubInfo>
			</div>
		</section>
	);
};
