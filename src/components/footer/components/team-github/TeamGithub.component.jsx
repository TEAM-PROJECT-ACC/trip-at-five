import {
	GithubInfo,
	MemberName,
	GithubLink,
} from '../github-info/GithubInfo.component';
import './teamGithub.style.scss';

export const TeamGithub = () => {
	return (
		<section className='global-footer__team-github'>
			<div className='global-footer__team-github-title'>TEAM MEMBER</div>
			<div className='global-footer__team-github-container'>
				<GithubInfo>
					<MemberName>김규형</MemberName>
					<GithubLink to={'https://github.com/kkh1396'}>@kkh1396</GithubLink>
				</GithubInfo>
				<GithubInfo>
					<MemberName>임성준</MemberName>
					<GithubLink to={'https://github.com/Seong-Jun1525'}>
						@Seong-Jun1525
					</GithubLink>
				</GithubInfo>
				<GithubInfo>
					<MemberName>이윤서</MemberName>
					<GithubLink to={'https://github.com/yoonseo0832'}>
						@yoonseo0832
					</GithubLink>
				</GithubInfo>
				<GithubInfo>
					<MemberName>장원일</MemberName>
					<GithubLink to={'https://github.com/fstwon'}>@fstwon</GithubLink>
				</GithubInfo>
			</div>
		</section>
	);
};
