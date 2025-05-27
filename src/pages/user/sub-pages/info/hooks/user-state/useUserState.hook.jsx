import { useContext } from 'react';
import { UserContext } from './contexts/UserContext.context';

export const useUserState = () => {
  const value = useContext(UserContext);
  return value;
};
