import { useContext } from 'react';
import { AgencyPageContext } from './Agencies/agency-page-context';
import { ManagerPageContext } from './Managers/manager-page-context';

export default function SettingsAddBtn({ label, extraClasses, ...props }) {
  function getSecondWord(str) {
    const words = str.split(' ');
    return words[1];
  }
  const strippedLabel = getSecondWord(label);

  let toggleAdd = '';
  let handleToggleAdd = () => {};
  if (strippedLabel === 'Agency') {
    const { toggleAddAgency, handleToggleAddAgency } =
      useContext(AgencyPageContext);
    toggleAdd = toggleAddAgency;
    handleToggleAdd = handleToggleAddAgency;
  } else if (strippedLabel === 'Manager') {
    const { toggleAddManager, handleToggleAddManager } =
      useContext(ManagerPageContext);
    toggleAdd = toggleAddManager;
    handleToggleAdd = handleToggleAddManager;
  }

  return (
    <div
      className={`flex gap-2 items-center cursor-pointer ${
        toggleAdd ? 'mb-4' : null
      }`}
      onClick={handleToggleAdd}
      {...props}
    >
      <span className="text-xl font-semibold">{label}</span>
      {toggleAdd ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      )}
    </div>
  );
}
