import { ButtonPrimary, PageContainer, Textarea } from "../../../components";
import './chat.room.conponent.scss';
import { MdClose } from '../../../assets/icons/logo/kkh/index';
import ChatRoomContent from "./content/Chat.room.content.conponent";


export default function ChatRoom() {
  return (
    <PageContainer>
			<div className='chat-room-wrap'>
        <MdClose className="chat-room-close-icon" />    
        <ChatRoomContent />
        <Textarea className={'chat-room-textarea'} placeholder={'채팅을 입력하세요...'} />
        <ButtonPrimary className={'chat-room-send-btn '}>전송</ButtonPrimary>
      </div>

    </PageContainer>
  )
}