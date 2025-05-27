import { PageContainer } from "../../../components";
import './chat.room.conponent.scss';
import { MdClose } from '../../../assets/icons/logo/kkh/index';
import ChatRoomContent from "./content/Chat.room.content.conponent";


export default function ChatRoom() {
  return (
    <PageContainer>
			<div className='chat-room-wrap'>
        <MdClose className="chat-room-close-icon" />

        {/* 추후 삭제 예정 */}
        <ChatRoomContent />
      </div>

    </PageContainer>
  )
}