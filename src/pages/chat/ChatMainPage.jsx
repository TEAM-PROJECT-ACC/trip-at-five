import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
	PageContainer,
	Select,
} from '../../components';
import { ChatTitle } from './chat-title/Chat.title.conponent';
import './chatMainPage.scss';

export function Chat() {
	return (
		<PageContainer className={'chat-container'}>
			<div className='chat-main-wrap'>
				<ChatTitle
					className={'chat-main-title'}
					text={'문의하기'}
				/>

				<InputPrimary className={'chat-main-content-input'} />
				<Select
					className={'chat-main-content-select'}
					optionList={[
						{ value: '1', label: '예약문의' },
						{ value: '2', label: '기타문의' },
					]}
				/>

				<div className='chat-main-button'>
					<ButtonSecondary className={'chat-send'}>취소</ButtonSecondary>
					<ButtonPrimary className={'chat-cancle'}>문의하기</ButtonPrimary>
				</div>
			</div>
		</PageContainer>
	);
}
