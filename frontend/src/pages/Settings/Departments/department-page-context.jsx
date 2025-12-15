import { createContext } from 'react';

export const DepartmentPageContext = createContext({
  toggleAddArea: [],
  setToggleAddArea: [],
  handleToggleAddArea: () => {},
  managers: [],
  isPending: [],
  isFetching: [],
  error: [],
});
