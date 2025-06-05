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
import { PageContainer, useWebSocket } from '../../../components';
import { serverWebSocketURL } from '../../../services/serverBaseURL';

const defaultMessage = [
  {
    model: {
      sender: 'Joe',
      message: '채팅이 시작되었습니다.',
      direction: 'incoming',
    },
  },
];

const getMessageComponent = (messages) => {
  return messages.map((message, index) => {
    return (
      <Message
        key={index}
        model={message.model}
      ></Message>
    );
  });
};

const ChatRoom = () => {
  const [messages, setMessages] = useState(defaultMessage);
  const { sendMessageWebSocket, closeWebSocket } = useWebSocket({
    requestURL: `${serverWebSocketURL}/chat`,
  });

  const handleSend = (message) => {
    let newMessage = {
      model: {
        message,
        direction: 'outgoing',
      },
    };
    sendMessageWebSocket(newMessage);
    // setMessages([...messages, newMessage]);
  };

  const handleCloseWebSocket = () => {
    closeWebSocket();
  };

  return (
    <PageContainer className={'chat-room-container'}>
      <div className='chat-main-room-wrap'>
        <FaArrowAltCircleLeft
          className='chat-room-close-icon'
          onClick={handleCloseWebSocket}
        />
        <MainContainer className='chat-main-container'>
          <ChatContainer className='chat-container-wrap'>
            <MessageList className='chat-message-list'>
              {getMessageComponent(messages)}
            </MessageList>
          </ChatContainer>
        </MainContainer>

        <MainContainer className='chat-input-container'>
          <ChatContainer>
            <MessageInput
              className='chat-message-list  '
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
