import './chat.room.log.conponent.scss';
import {ChatUserMessage, ChatAdminMessage} from './message/Chat.message';


export default function ChatLog() {
  return(
    <div className="chat-room-content-log-wrap">
          <ChatUserMessage />
          <ChatAdminMessage />
    </div>
  )
}