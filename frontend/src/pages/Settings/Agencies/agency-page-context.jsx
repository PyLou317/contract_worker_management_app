import { createContext } from 'react';

export const AgencyPageContext = createContext({
  toggleAddAgency: [],
  setToggleAddAgency: [],
  handleToggleAddAgency: () => {},
  agencies: [],
  isPending: [],
  isFetching: [],
  error: [],
  setShowSuccess: [],
});
