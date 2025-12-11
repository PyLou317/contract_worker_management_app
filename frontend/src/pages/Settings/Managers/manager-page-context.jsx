import { createContext } from 'react';

export const ManagerPageContext = createContext({
  toggleAddManager: [],
  setToggleAddManager: [],
  handleToggleAddManager: () => {},
  managers: [],
  isPending: [],
  isFetching: [],
  error: [],
  setShowSuccess: [],
});
