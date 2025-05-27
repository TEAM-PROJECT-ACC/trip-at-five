import { useState } from 'react';
import { UserContext } from './contexts/UserContext.context';

export const UserProvider = ({ children }) => {
  const value = useUserState();

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

const useUserState = () => {
  // TODO: 회원가입/로그인 완료 시 zustand에 저장되어 있는 회원 정보 가지고 옴
  const [state, setState] = useState(() => {});

  // TODO: state 상태 변경, zustand 상태 업데이트로 변경해야 할 수 있음
  const updateUserState = (newUserState) => {
    setState((prev) => {
      return {
        ...prev,
        ...newUserState,
      };
    });
  };

  return {
    userState: state,
    updateUserState,
  };
};
