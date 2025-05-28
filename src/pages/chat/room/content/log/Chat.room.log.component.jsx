import './chat.room.log.component.scss';
import {
	ChatUserMessage,
	ChatAdminMessage,
} from './message/Chat.message.component';

export default function ChatLog() {
	return (
		<div className='chat-room-content-log-wrap'>
			<div className='chat-room-content-log'>
				<ChatUserMessage />
				<ChatAdminMessage />
			</div>
		</div>
	);
}
