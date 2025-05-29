import { useState } from 'react';

import { FaArrowAltCircleLeft } from '../../../assets/icons/kkh/index';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '@chatscope/chat-ui-kit-react/dist/chat-ui-kit-react.min.js';
import './chat.room.scss';

import {
	MainContainer,
	ChatContainer,
	MessageList,
	Message,
	MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { PageContainer } from '../../../components';

const defaultMessage = [
	{
		model: {
			sender: 'Joe',
			message: '채팅이 시작되었습니다.',
			direction: 'incoming',
		},
		model: {
			sender: 'Joe',
			message: '채팅이 시작되었습니다.',
			direction: 'incoming',
		},
	},
];

const getMessageComponent = (data) => {
	return data.map((item, index) => {
		return (
			<Message
				key={index}
				model={item.model}
			></Message>
		);
	});
};

const ChatRoom = () => {
	const [messages, setMessages] = useState(defaultMessage);

	const handleSend = (input) => {
		let newMessage = {
			model: {
				message: input,
				direction: 'outgoing',
			},
		};

		setMessages([...messages, newMessage]);
	};

	return (
		<PageContainer className={'chat-room-container'}>
			<div className='chat-main-room-wrap'>
				<FaArrowAltCircleLeft className='chat-room-close-icon' />
				<MainContainer className='chat-main-container'>
					<ChatContainer className='chat-container-wrap'>
						<MessageList className='chat-mesggae-list'>
							{getMessageComponent(messages)}
						</MessageList>
					</ChatContainer>
				</MainContainer>

				<MainContainer className='chat-input-container'>
					<ChatContainer>
						<MessageInput
							className='chat-mesggae-list  '
							placeholder='Type message here'
							onSend={handleSend}
							attachButton={false}
							// value={'채팅을 입력하세요...'}
						/>
					</ChatContainer>
				</MainContainer>
			</div>
		</PageContainer>
	);
};

export default ChatRoom;
