import ChatItemText from '../../content-item/chat-text/Chat.text.conponent';
import './chat.message.scss';

export function ChatUserMessage() {


  const msg1 = '개인 사정이 생겨서 예약 취소 하려고 합니다.취소좀 해주시겠어요?';

  return(
    <div className="chat-user-Messgae-wrap">
        <ChatItemText className={'chat-user-nickName'}text={'사용자'} />
        <div className='chat-user-message-wrap'>
        <ChatItemText className={'chat-user-message'}text={msg1} />
        </div>
    </div>
  )
}

export function ChatAdminMessage() {


  const msg1 = '취소했습니다.';

  return(
    <div className="chat-admin-Messgae-wrap">
        <ChatItemText className={'chat-admin-nickName'}text={'관리자'} />
        <div className='chat-admin-message-wrap'>
        <ChatItemText className={'chat-admin-message'}text={msg1} />
        </div>
    </div>
  )
}