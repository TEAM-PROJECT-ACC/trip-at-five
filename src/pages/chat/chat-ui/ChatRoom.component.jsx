import { useEffect, useState } from 'react';
import { FaArrowAltCircleLeft } from '../../../assets/icons/kkh/index';
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import '@chatscope/chat-ui-kit-react/dist/chat-ui-kit-react.min.js';
import './chatRoom.style.scss';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
} from '@chatscope/chat-ui-kit-react';
import { PageContainer, useWebSocket } from '../../../components';
import { loginStateStore } from '../../../states/login/loginStore';
import { getInitChatRoom } from '../../../services/chat/chat.api';
import ChatStateStore from '../chatStore';
import { Navigate, useNavigate } from 'react-router-dom';
import { CHAT_REQUEST } from '../../../services/chat/chat.requests';
import { getMessage, getMessages } from '../utils/getMessages/getMessages.util';
import { VITE_WEB_SOCKET_URL } from '../../../../env.config';

// const defaultMessage = [
//   {
//     model: {
//       sender: 'Joe',
//       message: '채팅이 시작되었습니다.',
//       direction: 'incoming',
//     },
//   },
//   {
//     model: {
//       sender: 'Joe',
//       message: '채팅이 시작되었습니다.',
//       direction: 'incoming',
//     },
//   },
// ];

const getMessageComponent = (messages) => {
  return (
    <>
      {messages.length > 0 &&
        messages.map((message, index) => {
          return (
            <Message
              key={index}
              model={message.model}
            ></Message>
          );
        })}
    </>
  );
};

const ChatRoom = () => {
  const [messages, setMessages] = useState(() => []);
  const [chatRoom, setChatRoom] = useState(() => null);
  const { category, roomNo } = ChatStateStore();
  const { loginInfo, setLoginInfo } = loginStateStore();
  const navigate = useNavigate();
  const { data, createWebSocket, sendMessageWebSocket, closeWebSocket } =
    useWebSocket();

  const handleSend = (message) => {
    let messageData = {};
    let sender = '';

    if (loginInfo) {
      const isAdmin = loginInfo.memType === 'admin';
      sender = isAdmin ? loginInfo.adminEmailId : loginInfo.memEmailId;

      messageData = {
        chatMsgCont: message,
        ckSenderType: isAdmin ? 'ADMIN' : 'MEMBER',
        senderEmail: sender,
      };
    } else {
      messageData = {
        chatMsgCont: message,
        ckSenderType: 'NON-M',
        senderEmail: '',
      };
    }

    const webSocketData = {
      type: 'NEW',
      data: {
        chatRoom,
        messageData,
      },
    };

    const newMessage = getMessage(messageData, loginInfo);

    sendMessageWebSocket(webSocketData);
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleCloseWebSocket = () => {
    closeWebSocket();
    if (loginInfo) {
      if (loginInfo.memType === 'admin') {
        navigate('/admin/contact');
      } else {
        if (loginInfo.memType === 'non-m') {
          navigate('/guest/reservations');
        } else {
          navigate('/users');
        }
      }
    } else {
      navigate('/guest/reservations');
    }
  };

  useEffect(() => {
    if (loginInfo && category) {
      const apiRequestData = {
        loginInfo,
        inqCtgCd: category.value,
      };

      if (loginInfo.memType === 'admin') {
        apiRequestData.roomNo = roomNo;
      }

      getInitChatRoom(apiRequestData).then((data) => {
        createWebSocket({
          requestURL: `${VITE_WEB_SOCKET_URL}${CHAT_REQUEST.initChatRoom}`,
          type: data.messages && data.messages.length > 0 ? 'EXISTING' : 'INIT',
          data,
        });
        const messages = getMessages(data.messages, loginInfo);
        setMessages(() => messages);
        setChatRoom(() => data.chatRoom);
      });
    }
    return () => {
      closeWebSocket();
      console.log('websocket closed');
      if (loginInfo.memType === 'non-m') {
        setLoginInfo(null);
      }
    };
  }, [
    category,
    closeWebSocket,
    createWebSocket,
    loginInfo,
    roomNo,
    setLoginInfo,
  ]);

  useEffect(() => {
    if (data) {
      const messages = getMessages(data.messages, loginInfo);

      if (messages.length > 0) {
        setMessages((prevMessages) => [...prevMessages, ...messages]);
      }
    }
  }, [data, loginInfo]);

  return (
    <PageContainer className={'chat-room-container'}>
      {loginInfo && category ? (
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
      ) : (
        <Navigate to={'/chat'} />
      )}
    </PageContainer>
  );
};

export default ChatRoom;
