import { Link, Navigate } from 'react-router-dom';
import {
  ButtonPrimary,
  ButtonSecondary,
  InputPrimary,
  PageContainer,
  Select,
} from '../../components';
import { ChatTitle } from './chat-title/ChatTitle.component';
import ChatStateStore from './chatStore';
import { loginStateStore } from '../../states/login/loginStore';
import { topCenterAlert } from '../../utils/toastUtils/toastUtils';
import './chatMain.style.scss';

export function Chat() {
  const { category, setMessage, setCategory } = ChatStateStore();
  const { loginInfo } = loginStateStore();

  const onSelect = (option) => {
    setCategory(option);
  };

  const onClickContactButton = (event) => {
    if (!category) {
      event.preventDefault();
      topCenterAlert('문의 유형을 선택해주세요');
    }
  };

  return (
    <PageContainer className={'chat-container'}>
      {loginInfo ? (
        <div className='chat-main-wrap'>
          <ChatTitle
            className={'chat-main-title'}
            text={'문의하기'}
          />

          <InputPrimary
            className={'chat-main-content-input'}
            defaultValue={loginInfo.memNick}
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            readOnly={loginInfo.memNick !== ''}
          />
          <Select
            className={'chat-main-content-select'}
            optionList={[
              { value: 'RESERVE', label: '예약문의' },
              { value: 'ETC', label: '기타문의' },
            ]}
            onSelect={onSelect}
          />

          <div className='chat-main-button'>
            <ButtonSecondary className={'chat-send'}>취소</ButtonSecondary>
            <Link
              to='room/'
              onClick={onClickContactButton}
            >
              <ButtonPrimary className={'chat-cancel'}>문의하기</ButtonPrimary>
            </Link>
          </div>
        </div>
      ) : (
        <Navigate to='/login' />
      )}
    </PageContainer>
  );
}
