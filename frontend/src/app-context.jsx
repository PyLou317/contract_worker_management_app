import { createContext } from 'react';

export const AppContext = createContext({
  userData: [],
  userDataIsPending: [],
  userDataIsFetching: [],
  userDataError: [],
});
