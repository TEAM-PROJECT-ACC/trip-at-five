import {
	Button,
	ButtonPrimary,
	ButtonSecondary,
	LinkButton,
	TextLinkButton,
	InputPrimary,
	InputSecondary,
	InputShrink,
	Label,
} from '../../components';
import { ClassNamesTest } from '../../utils';
import './test.style.scss';

export const TestPage = () => {
	return (
		<div className='test-page__container'>
			<ClassNamesTest />
			<section className='test-page__section'>
				<h1>전역 (공용) 컴포넌트 확인</h1>
				<h3>input component</h3>
				<div className='test-page__test-area'>
					<InputPrimary />
					<InputSecondary />
					<InputShrink labelText={'라벨'} />
				</div>
				<h3>button component</h3>
				<div className='test-page__test-area'>
					<Button>버튼</Button>
					<ButtonPrimary>기본 버튼</ButtonPrimary>
					<ButtonSecondary>두번째 버튼</ButtonSecondary>
					<LinkButton>링크버튼</LinkButton>
					<span className='test-page__text-link-container'>
						<TextLinkButton>텍스트링크버튼</TextLinkButton>
					</span>
				</div>
				<h3>label component</h3>
				<div className='test-page__test-area'>
					<Label className='primary'>primary</Label>
					<Label className='secondary'>secondary</Label>
					<Label className='neutral'>neutral</Label>
					<Label className='danger'>danger</Label>
				</div>
			</section>
		</div>
	);
};

//test-page__section
