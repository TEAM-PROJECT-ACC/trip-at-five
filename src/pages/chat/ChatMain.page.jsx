import { Link } from 'react-router-dom';
import {
	ButtonPrimary,
	ButtonSecondary,
	InputPrimary,
	PageContainer,
	Select,
} from '../../components';
import { ChatTitle } from './chat-title/ChatTitle.component';
import './chatMain.style.scss';
import ChatStateStore from './chatStore';

export function Chat() {
	const { setMessage } = ChatStateStore();
	return (
		<PageContainer className={'chat-container'}>
			<div className='chat-main-wrap'>
				<ChatTitle
					className={'chat-main-title'}
					text={'문의하기'}
				/>

				<InputPrimary
					className={'chat-main-content-input'}
					onChange={(e) => {
						setMessage(e.target.value);
					}}
				/>
				<Select
					className={'chat-main-content-select'}
					optionList={[
						{ value: '1', label: '예약문의' },
						{ value: '2', label: '기타문의' },
					]}
				/>

				<div className='chat-main-button'>
					<ButtonSecondary className={'chat-send'}>취소</ButtonSecondary>
					<Link to='room/'>
						<ButtonPrimary className={'chat-cancle'}>문의하기</ButtonPrimary>
					</Link>
				</div>
			</div>
		</PageContainer>
	);
}
