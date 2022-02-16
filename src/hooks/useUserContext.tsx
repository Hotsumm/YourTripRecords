import { UserContext } from '../Context';
import { useContext } from 'react';

export const useUserContext = () => {
  const { userObj, refreshUser } = useContext(UserContext);
  if (!userObj) {
    throw new Error(
      'useUserContext must be used within the UserContext.Provider',
    );
  }
  return { userObj, refreshUser };
};
