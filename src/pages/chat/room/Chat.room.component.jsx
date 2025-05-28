import { ButtonPrimary, PageContainer, Textarea } from '../../../components';
import './chat.room.component.scss';
import { FaArrowAltCircleLeft } from '../../../assets/icons/kkh/index';
import ChatLog from './content/log/Chat.room.log.component';

export default function ChatRoom() {
	return (
		<PageContainer className={'chat-container'}>
			<div className='chat-room-wrap'>
				<FaArrowAltCircleLeft className='chat-room-close-icon' />
				<ChatLog />
				<div className='chat-room-textarea-wrap'>
					<Textarea
						className={'chat-room-textarea'}
						placeholder={'채팅을 입력하세요...'}
					/>
				</div>
				<ButtonPrimary className={'chat-room-send-btn '}>전송</ButtonPrimary>
			</div>
		</PageContainer>
	);
}
