import { Link } from 'react-router-dom';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
  PageContainer,
  Select,
} from '../../components';
import { ChatTitle } from './chat-title/Chat.title.conponent';
import './chatMainPage.scss';
import ChatStateStore from './chatStore';

export function Chat() {
  const { setMessage } = ChatStateStore();

  // TODO:
  // 1. 카테고리 선택
  // 2. 문의하기 클릭 시 채팅 방 페이지 이동

  // [GET] 로그인 회원 정보를 서버에 요청 후
  // 채팅방 데이터가 있으면 채팅방 페이지로 리디렉트

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
