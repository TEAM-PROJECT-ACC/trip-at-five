import { InputPrimary, PageContainer, Select } from '../../components';
import { ChatTitle } from './chat-title/Chat.title.conponent';
import './chat.main.conponent.scss';

export function Chat() {
	return (
		<PageContainer>
			<div className='chat-wrap'>
				<ChatTitle
					className={'chat-top-title'}
					text={'문의하기'}
				/>

				<InputPrimary className={'chat-content-input'} />
				<Select className={'chat-content-select'}
					optionList={[
						{ value: '1', label: '예약문의' },
						{ value: '2', label: '기타문의' },
					]}
				/>
			</div>
		</PageContainer>
	);
}
